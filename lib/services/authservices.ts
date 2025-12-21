//12231948 Lutfi made auth service for login signin
// lib/services/auth.service.ts
// Authentication Service dengan Supabase

// lib/services/authservices.ts
// Optimized version dengan salt rounds lebih rendah
// Add detailed error logging

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

const SALT_ROUNDS = 6

const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(SALT_ROUNDS)
  return bcrypt.hash(password, salt)
}

const verifyPassword = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash)
}

// Register user
export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
  try {
    console.log('🔍 Register attempt:', { username: data.username })

    // Check if username already exists
    // ⚠️ PENTING: Jangan pakai .single() karena akan error jika tidak ada data
    const { data: existingUsers, error: checkError } = await supabase
      .from('user')
      .select('username')
      .eq('username', data.username)

    console.log('🔍 Existing user check:', { 
      found: existingUsers && existingUsers.length > 0, 
      count: existingUsers?.length,
      error: checkError 
    })

    // Jika ada error selain "not found", return error
    if (checkError) {
      console.error('❌ Database check error:', checkError)
      return {
        success: false,
        message: `Error checking username: ${checkError.message}`
      }
    }

    // Jika username sudah ada (array tidak kosong)
    if (existingUsers && existingUsers.length > 0) {
      console.log('⚠️ Username already exists')
      return {
        success: false,
        message: 'Username sudah terdaftar'
      }
    }

    console.log('✅ Username available, hashing password...')
    const hashedPassword = await hashPassword(data.password)
    console.log('✅ Password hashed')

    // Insert new user
    const { data: newUser, error } = await supabase
      .from('user')
      .insert({
        username: data.username,
        password: hashedPassword
      })
      .select('id_user, username')
      .single()

    console.log('🔍 Insert result:', { newUser, error })

    if (error) {
      console.error('❌ Insert error:', error)
      return {
        success: false,
        message: `Gagal membuat akun: ${error.message}`
      }
    }

    console.log('✅ Registration successful!')
    return {
      success: true,
      message: 'Akun berhasil dibuat',
      user: newUser
    }
  } catch (error) {
    console.error('❌ Register exception:', error)
    return {
      success: false,
      message: `Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`
    }
  }
}

// Login user
export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
  try {
    console.log('🔍 Login attempt:', { username: credentials.username })

    // Get user by username
    const { data: user, error } = await supabase
      .from('user')
      .select('id_user, username, password')
      .eq('username', credentials.username)
      .single()

    console.log('🔍 User lookup:', { found: !!user, error })

    if (error) {
      console.error('❌ User lookup error:', error)
      return {
        success: false,
        message: error.code === 'PGRST116' 
          ? 'Username atau password salah' 
          : `Error: ${error.message}`
      }
    }

    if (!user) {
      console.log('⚠️ User not found')
      return {
        success: false,
        message: 'Username atau password salah'
      }
    }

    console.log('✅ User found, verifying password...')
    const isValidPassword = await verifyPassword(credentials.password, user.password)
    console.log('🔍 Password valid:', isValidPassword)

    if (!isValidPassword) {
      console.log('⚠️ Invalid password')
      return {
        success: false,
        message: 'Username atau password salah'
      }
    }

    console.log('✅ Login successful!')
    return {
      success: true,
      message: 'Login berhasil',
      user: {
        id_user: user.id_user,
        username: user.username
      }
    }
  } catch (error) {
    console.error('❌ Login exception:', error)
    return {
      success: false,
      message: `Terjadi kesalahan: ${error instanceof Error ? error.message : 'Unknown error'}`
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