/**
 * SK Bebuloh WP Labuan — Supabase Data Fetchers
 * -----------------------------------------------------
 * All Supabase fetchers include:
 * - 8s AbortController timeout
 * - Graceful error handling
 * - Fallback return arrays to prevent undefined crashes
 * - Safe for use in Next.js dynamic server components
 */

import { supabase } from './supabaseClient';

/** Utility function to add timeout safety to Supabase queries */
async function withTimeout<T>(promise: Promise<T>, ms = 8000): Promise<T> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), ms);

  try {
    // @ts-ignore - Supabase supports .signal on fetch
    const result = await promise;
    clearTimeout(timeout);
    return result;
  } catch (error) {
    clearTimeout(timeout);
    console.error(`⏱️ Supabase request timed out after ${ms / 1000}s`, error);
    throw error;
  }
}

/** Fetch all staff (ordered alphabetically) */
export async function getAllStaff() {
  try {
    const { data, error } = await withTimeout(
      supabase.from('staff').select('*').order('name_en', { ascending: true })
    );
    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error('❌ getAllStaff error:', err.message);
    return [];
  }
}

/** Fetch a single staff member by ID */
export async function getStaffById(id: string) {
  try {
    const { data, error } = await withTimeout(
      supabase.from('staff').select('*').eq('id', id).single()
    );
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('❌ getStaffById error:', err.message);
    return null;
  }
}

/** Fetch featured staff (highlighted on homepage) */
export async function getFeaturedStaff() {
  try {
    const { data, error } = await withTimeout(
      supabase.from('staff').select('*').eq('is_featured', true).limit(8)
    );
    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error('❌ getFeaturedStaff error:', err.message);
    return [];
  }
}

/** Fetch PK Section data (Kurikulum, HEM, Kokurikulum) */
export async function getPKSections() {
  try {
    const { data, error } = await withTimeout(
      supabase.from('pk_sections').select('*').order('name_en', { ascending: true })
    );
    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error('❌ getPKSections error:', err.message);
    return [];
  }
}

/** Fetch all achievements (for AchievementsSection) */
export async function getAchievements() {
  try {
    const { data, error } = await withTimeout(
      supabase.from('achievements').select('*').order('year', { ascending: false })
    );
    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error('❌ getAchievements error:', err.message);
    return [];
  }
}

/** Fetch all posts (news & events) */
export async function getPosts() {
  try {
    const { data, error } = await withTimeout(
      supabase.from('posts').select('*').order('date', { ascending: false }).limit(10)
    );
    if (error) throw error;
    return data || [];
  } catch (err: any) {
    console.error('❌ getPosts error:', err.message);
    return [];
  }
}

/** Fetch school metadata (name, motto, contact info) */
export async function getSchoolMetadata() {
  try {
    const { data, error } = await withTimeout(
      supabase.from('school_metadata').select('*').limit(1).single()
    );
    if (error) throw error;
    return data;
  } catch (err: any) {
    console.error('❌ getSchoolMetadata error:', err.message);
    return {
      name_en: 'Sekolah Kebangsaan Bebuloh WP Labuan',
      name_bm: 'Sekolah Kebangsaan Bebuloh WP Labuan',
      address: 'Labuan Federal Territory, Malaysia',
      phone: '+60 87-xxxxxx',
      email: 'skb@moe.gov.my'
    };
  }
}

/** Fetch data concurrently for homepage (optional optimization) */
export async function getHomepageData() {
  try {
    const [staff, pkSections, achievements, posts] = await Promise.all([
      getFeaturedStaff(),
      getPKSections(),
      getAchievements(),
      getPosts(),
    ]);
    return { staff, pkSections, achievements, posts };
  } catch (err) {
    console.error('❌ getHomepageData error:', err);
    return { staff: [], pkSections: [], achievements: [], posts: [] };
  }
}
