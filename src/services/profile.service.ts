import { supabase } from '../config/supabase';
import type { BusinessProfile } from '../types';

const NOT_CONFIGURED_ERROR_MSG = 'Supabase is not configured. Please add your Supabase URL and Anon Key to the .env file.';
const NOT_CONFIGURED_ERROR = { profile: null, error: new Error(NOT_CONFIGURED_ERROR_MSG) };

export class ProfileService {
  async createProfile(profile: Omit<BusinessProfile, 'id' | 'created_at' | 'updated_at'>): Promise<{ profile: BusinessProfile | null; error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR;
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .insert(profile)
        .select()
        .single();

      if (error) throw error;

      return { profile: data as BusinessProfile, error: null };
    } catch (error) {
      return { profile: null, error: error as Error };
    }
  }

  async getProfile(userId: string): Promise<BusinessProfile | null> {
    if (!supabase) return null;
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', userId)
        .single();

      if (error) throw error;

      return data as BusinessProfile;
    } catch {
      return null;
    }
  }

  async updateProfile(id: string, updates: Partial<BusinessProfile>): Promise<{ profile: BusinessProfile | null; error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR;
    try {
      const { data, error } = await supabase
        .from('business_profiles')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { profile: data as BusinessProfile, error: null };
    } catch (error) {
      return { profile: null, error: error as Error };
    }
  }
}

export const profileService = new ProfileService();
