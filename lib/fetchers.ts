import { supabase } from './supabaseClient'

export const getSchoolMetadata = async () => {
  const { data, error } = await supabase
    .from('school_metadata')
    .select('*')
    .single()
  
  if (error) {
    console.error('Error fetching school metadata:', error)
    return null
  }
  
  return data
}

export const getFeaturedStaff = async () => {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('is_featured', true)
    .limit(6)
  
  if (error) {
    console.error('Error fetching featured staff:', error)
    return []
  }
  
  return data || []
}

export const getHeadmasterMessage = async () => {
  const { data, error } = await supabase
    .from('staff')
    .select('*')
    .eq('role_en', 'Headmaster')
    .single()
  
  if (error) {
    console.error('Error fetching headmaster:', error)
    return null
  }
  
  return data
}

export const getPKSections = async () => {
  const { data, error } = await supabase
    .from('pk_sections')
    .select('*')
  
  if (error) {
    console.error('Error fetching PK sections:', error)
    return []
  }
  
  return data || []
}

export const getAchievements = async () => {
  const { data, error } = await supabase
    .from('achievements')
    .select('*')
  
  if (error) {
    console.error('Error fetching achievements:', error)
    return []
  }
  
  return data || []
}

export const getPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('date', { ascending: false })
    .limit(3)
  
  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }
  
  return data || []
}
