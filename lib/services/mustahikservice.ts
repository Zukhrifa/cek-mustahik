//12231948 Lutfi made mustahik services
// lib/services/mustahik.service.ts
// Service untuk CRUD operations Mustahik

import { supabase } from '@/lib/supabase'
import { Mustahik, MustahikCreateInput, MustahikUpdateInput } from '@/lib/types/mustahik.types'

export interface MustahikResponse {
  success: boolean
  message: string
  data?: Partial<Mustahik> | Partial<Mustahik>[];
}

// Create mustahik (untuk bulk check)
export const createMustahik = async (input: MustahikCreateInput): Promise<MustahikResponse> => {
  try {
    const { data, error } = await supabase
      .from('mustahik')
      .insert({
        id_user: input.id_user,
        nama: input.nama,
        penghasilan: input.penghasilan,
        pekerjaan: input.pekerjaan,
        jml_tanggungan: input.jml_tanggungan,
        ump_domisili: input.ump_domisili,
        alamat: input.alamat,
        status_kelayakan: input.status_kelayakan,
      })
      .select()
      .single()

    if (error) {
      console.error('Create mustahik error:', error)
      return {
        success: false,
        message: 'Gagal menyimpan data mustahik'
      }
    }

    return {
      success: true,
      message: 'Data mustahik berhasil disimpan',
      data: data as Mustahik
    }
  } catch (error) {
    console.error('Create mustahik error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat menyimpan data'
    }
  }
}

// Create multiple mustahik (bulk insert)
export const createBulkMustahik = async (inputs: MustahikCreateInput[]): Promise<MustahikResponse> => {
  try {
    const { data, error } = await supabase
      .from('mustahik')
      .insert(inputs.map(input => ({
        id_user: input.id_user,
        nama: input.nama,
        penghasilan: input.penghasilan,
        pekerjaan: input.pekerjaan,
        jml_tanggungan: input.jml_tanggungan,
        ump_domisili: input.ump_domisili,
        alamat: input.alamat,
        status_kelayakan: input.status_kelayakan,
      })))
      .select()

    if (error) {
      console.error('Create bulk mustahik error:', error)
      return {
        success: false,
        message: 'Gagal menyimpan data mustahik'
      }
    }

    return {
      success: true,
      message: `${data.length} data mustahik berhasil disimpan`,
      data: data as Mustahik[]
    }
  } catch (error) {
    console.error('Create bulk mustahik error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat menyimpan data'
    }
  }
}

// Get all mustahik by user
export const getMustahikByUser = async (userId: number): Promise<MustahikResponse> => {
  try {
    const { data, error } = await supabase
      .from('mustahik')
      .select('*')
      .eq('id_user', userId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Get mustahik error:', error)
      return {
        success: false,
        message: 'Gagal mengambil data mustahik'
      }
    }

    return {
      success: true,
      message: 'Data mustahik berhasil diambil',
      data: data as Mustahik[]
    }
  } catch (error) {
    console.error('Get mustahik error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengambil data'
    }
  }
}

// Get single mustahik by id
export const getMustahikById = async (id: number): Promise<MustahikResponse> => {
  try {
    const { data, error } = await supabase
      .from('mustahik')
      .select('*')
      .eq('id_mustahik', id)
      .single()

    if (error) {
      console.error('Get mustahik by id error:', error)
      return {
        success: false,
        message: 'Gagal mengambil data mustahik'
      }
    }

    return {
      success: true,
      message: 'Data mustahik berhasil diambil',
      data: data as Mustahik
    }
  } catch (error) {
    console.error('Get mustahik by id error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengambil data'
    }
  }
}

// Update mustahik
export const updateMustahik = async (
  id: number,
  input: MustahikUpdateInput
): Promise<MustahikResponse> => {
  try {
    const { data, error } = await supabase
      .from('mustahik')
      .update(input)
      .eq('id_mustahik', id)
      .select()
      .single()

    if (error) {
      console.error('Update mustahik error:', error)
      return {
        success: false,
        message: 'Gagal mengupdate data mustahik'
      }
    }

    return {
      success: true,
      message: 'Data mustahik berhasil diupdate',
      data: data as Mustahik
    }
  } catch (error) {
    console.error('Update mustahik error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengupdate data'
    }
  }
}

// Delete mustahik
export const deleteMustahik = async (id: number): Promise<MustahikResponse> => {
  try {
    const { error } = await supabase
      .from('mustahik')
      .delete()
      .eq('id_mustahik', id)

    if (error) {
      console.error('Delete mustahik error:', error)
      return {
        success: false,
        message: 'Gagal menghapus data mustahik'
      }
    }

    return {
      success: true,
      message: 'Data mustahik berhasil dihapus'
    }
  } catch (error) {
    console.error('Delete mustahik error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat menghapus data'
    }
  }
}

// Delete all mustahik by user
export const deleteAllMustahikByUser = async (userId: number): Promise<MustahikResponse> => {
  try {
    const { error } = await supabase
      .from('mustahik')
      .delete()
      .eq('id_user', userId)

    if (error) {
      console.error('Delete all mustahik error:', error)
      return {
        success: false,
        message: 'Gagal menghapus semua data mustahik'
      }
    }

    return {
      success: true,
      message: 'Semua data mustahik berhasil dihapus'
    }
  } catch (error) {
    console.error('Delete all mustahik error:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat menghapus data'
    }
  }
}
