//12231948 Lutfi made auth hook to connect w supabase
// hooks/useAuth.tsx
// Auth Context & Hook untuk manage authentication state

'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { loginUser, registerUser, updatePassword, deleteAccount, LoginCredentials, RegisterData } from "@/lib/services/authservices"

interface User {
  id_user: number
  username: string
}

interface AuthContextType {
  user: User | null
  isLoggedIn: boolean
  isLoading: boolean
  login: (credentials: LoginCredentials) => Promise<boolean>
  register: (data: RegisterData) => Promise<boolean>
  logout: () => void
  changePassword: (currentPassword: string, newPassword: string) => Promise<boolean>
  removeAccount: () => Promise<boolean>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('mustahik_user')
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user:', error)
        localStorage.removeItem('mustahik_user')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    const response = await loginUser(credentials)
    
    if (response.success && response.user) {
      setUser(response.user)
      localStorage.setItem('mustahik_user', JSON.stringify(response.user))
      return true
    }
    
    return false
  }

  const register = async (data: RegisterData): Promise<boolean> => {
    const response = await registerUser(data)
    return response.success
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('mustahik_user')
  }

  const changePassword = async (currentPassword: string, newPassword: string): Promise<boolean> => {
    if (!user) return false
    
    const response = await updatePassword(user.id_user, currentPassword, newPassword)
    return response.success
  }

  const removeAccount = async (): Promise<boolean> => {
    if (!user) return false
    
    const response = await deleteAccount(user.id_user)
    
    if (response.success) {
      logout()
      return true
    }
    
    return false
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        isLoading,
        login,
        register,
        logout,
        changePassword,
        removeAccount,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}