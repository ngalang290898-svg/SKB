import { supabase } from './supabaseClient';

/** Generic timeout wrapper using Promise.race() */
async function withTimeout<T>(operation: Promise<T>, ms = 4000): Promise<T> {
  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error(`Timed out after ${ms} ms`)), ms)
  );
  return Promise.race([operation, timeout]);
}

/** Defensive check so we don’t hang on missing env vars */
function hasEnv() {
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
    console.warn('⚠️ Supabase env vars missing; returning empty data.');
    return false;
  }
  return true;
}

/* ---------------- Staff ---------------- */
export async function getAllStaff() {
  if (!hasEnv()) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('staff').select('*').order('name_en').limit(100)
    );
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('❌ getAllStaff:', err);
    return [];
  }
}

export async function getStaffById(id: string) {
  if (!hasEnv()) return null;
  try {
    const { data, error } = await withTimeout(
      supabase.from('staff').select('*').eq('id', id).single()
    );
    if (error) throw error;
    return data ?? null;
  } catch (err) {
    console.error('❌ getStaffById:', err);
    return null;
  }
}

export async function getFeaturedStaff() {
  if (!hasEnv()) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('staff').select('*').eq('is_featured', true).limit(8)
    );
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('❌ getFeaturedStaff:', err);
    return [];
  }
}

/* ---------------- PK Sections ---------------- */
export async function getPKSections() {
  if (!hasEnv()) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('pk_sections').select('*').order('name_en')
    );
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('❌ getPKSections:', err);
    return [];
  }
}

/* ---------------- Achievements ---------------- */
export async function getAchievements() {
  if (!hasEnv()) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('achievements').select('*').order('year', { ascending: false }).limit(50)
    );
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('❌ getAchievements:', err);
    return [];
  }
}

/* ---------------- Posts ---------------- */
export async function getPosts() {
  if (!hasEnv()) return [];
  try {
    const { data, error } = await withTimeout(
      supabase.from('posts').select('*').order('date', { ascending: false }).limit(10)
    );
    if (error) throw error;
    return data ?? [];
  } catch (err) {
    console.error('❌ getPosts:', err);
    return [];
  }
}

/* ---------------- School Metadata ---------------- */
export async function getSchoolMetadata() {
  if (!hasEnv())
    return {
      name_en: 'Sekolah Kebangsaan Bebuloh WP Labuan',
      name_bm: 'Sekolah Kebangsaan Bebuloh WP Labuan',
      address: 'Labuan Federal Territory, Malaysia',
      phone: '+60 87-xxxxxx',
      email: 'skb@moe.gov.my',
    };

  try {
    const { data, error } = await withTimeout(
      supabase.from('school_metadata').select('*').limit(1).single()
    );
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('❌ getSchoolMetadata:', err);
    return {
      name_en: 'Sekolah Kebangsaan Bebuloh WP Labuan',
      name_bm: 'Sekolah Kebangsaan Bebuloh WP Labuan',
      address: 'Labuan Federal Territory, Malaysia',
      phone: '+60 87-xxxxxx',
      email: 'skb@moe.gov.my',
    };
  }
}

/* ---------------- Homepage bundle ---------------- */
export async function getHomepageData() {
  try {
    const [staff, pkSections, achievements, posts] = await Promise.allSettled([
      getFeaturedStaff(),
      getPKSections(),
      getAchievements(),
      getPosts(),
    ]);

    return {
      staff: staff.status === 'fulfilled' ? staff.value : [],
      pkSections: pkSections.status === 'fulfilled' ? pkSections.value : [],
      achievements: achievements.status === 'fulfilled' ? achievements.value : [],
      posts: posts.status === 'fulfilled' ? posts.value : [],
    };
  } catch (err) {
    console.error('❌ getHomepageData:', err);
    return { staff: [], pkSections: [], achievements: [], posts: [] };
  }
}
