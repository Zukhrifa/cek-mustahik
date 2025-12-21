//12231948 Lutfi made auth service for login signin
// lib/services/auth.service.ts
// Authentication Service dengan Supabase

// lib/services/authservices.ts
// Optimized version dengan salt rounds lebih rendah

import { supabase } from '@/lib/supabase'
import bcrypt from 'bcryptjs'

export interface LoginCredentials {
  username: string
  password: string
}

export interface RegisterData {
  username: string
  password: string
}

export interface AuthResponse {
  success: boolean
  message: string
  user?: {
    id_user: number
    username: string
  }
}

// ⚡ OPTIMIZED: Kurangi salt rounds dari 10 ke 6
// Salt 6 = ~100ms (fast, masih aman untuk aplikasi kecil)
// Salt 10 = ~2-5 detik (sangat lambat di browser)
const SALT_ROUNDS = 6

// Hash password
const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

// Verify password
const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

// Register user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    // Check if username already exists
    const { data: existingUser } = await supabase
      .from('user')
      .select('username')
      .eq('username', data.username)
      .single()

    if (existingUser) {
      return {
        success: false,
        message: 'Username sudah terdaftar'
      }
    }

    // Hash password
    const hashedPassword = await hashPassword(data.password)

    // Insert new user
    const { data: newUser, error } = await supabase
      .from('user')
      .insert({
        username: data.username,
        password: hashedPassword
      })
      .select('id_user, username')
      .single()

    if (error) {
      console.error('Register error:', error)
      return {
        success: false,
        message: 'Gagal membuat akun'
      }
    }

    return {
      success: true,
      message: 'Akun berhasil dibuat',
      user: newUser
    }
  } catch (error) {
    console.error('Register error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat membuat akun'
    }
  }
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    // Get user by username
    const { data: user, error } = await supabase
      .from('user')
      .select('id_user, username, password')
      .eq('username', credentials.username)
      .single()

    if (error || !user) {
      return {
        success: false,
        message: 'Username atau password salah'
      }
    }

    // Verify password
    const isValidPassword = await verifyPassword(credentials.password, user.password)

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Username atau password salah'
      }
    }

    return {
      success: true,
      message: 'Login berhasil',
      user: {
        id_user: user.id_user,
        username: user.username
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat login'
    }
  }
}

// Update password
export const updatePassword = async (
  userId: number,
  currentPassword: string,
  newPassword: string
): Promise<AuthResponse> => {
  try {
    const { data: user, error } = await supabase
      .from('user')
      .select('password')
      .eq('id_user', userId)
      .single()

    if (error || !user) {
      return {
        success: false,
        message: 'User tidak ditemukan'
      }
    }

    const isValidPassword = await verifyPassword(currentPassword, user.password)

    if (!isValidPassword) {
      return {
        success: false,
        message: 'Password saat ini salah'
      }
    }

    const hashedPassword = await hashPassword(newPassword)

    const { error: updateError } = await supabase
      .from('user')
      .update({ password: hashedPassword })
      .eq('id_user', userId)

    if (updateError) {
      console.error('Update password error:', updateError)
      return {
        success: false,
        message: 'Gagal mengubah password'
      }
    }

    return {
      success: true,
      message: 'Password berhasil diubah'
    }
  } catch (error) {
    console.error('Update password error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengubah password'
    }
  }
}

// Delete account
export const deleteAccount = async (userId: number): Promise<AuthResponse> => {
  try {
    await supabase
      .from('mustahik')
      .delete()
      .eq('id_user', userId)

    const { error } = await supabase
      .from('user')
      .delete()
      .eq('id_user', userId)

    if (error) {
      console.error('Delete account error:', error)
      return {
        success: false,
        message: 'Gagal menghapus akun'
      }
    }

    return {
      success: true,
      message: 'Akun berhasil dihapus'
    }
  } catch (error) {
    console.error('Delete account error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat menghapus akun'
    }
  }
}