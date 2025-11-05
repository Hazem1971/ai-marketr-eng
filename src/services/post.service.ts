import { supabase } from '../config/supabase';
import type { SocialPost } from '../types';

const NOT_CONFIGURED_ERROR_MSG = 'Supabase is not configured. Please add your Supabase URL and Anon Key to the .env file.';
const NOT_CONFIGURED_ERROR = { post: null, error: new Error(NOT_CONFIGURED_ERROR_MSG) };
const NOT_CONFIGURED_ERROR_GENERIC = { error: new Error(NOT_CONFIGURED_ERROR_MSG) };

export class PostService {
  async createPost(post: Omit<SocialPost, 'id' | 'created_at' | 'updated_at'>): Promise<{ post: SocialPost | null; error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR;
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .insert(post)
        .select()
        .single();

      if (error) throw error;

      return { post: data as SocialPost, error: null };
    } catch (error) {
      return { post: null, error: error as Error };
    }
  }

  async getPosts(profileId: string): Promise<SocialPost[]> {
    if (!supabase) return [];
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .select('*')
        .eq('profile_id', profileId)
        .order('created_at', { ascending: false });

      if (error) throw error;

      return data as SocialPost[];
    } catch {
      return [];
    }
  }

  async updatePost(id: string, updates: Partial<SocialPost>): Promise<{ post: SocialPost | null; error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR;
    try {
      const { data, error } = await supabase
        .from('social_posts')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;

      return { post: data as SocialPost, error: null };
    } catch (error) {
      return { post: null, error: error as Error };
    }
  }

  async deletePost(id: string): Promise<{ error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR_GENERIC;
    try {
      const { error } = await supabase
        .from('social_posts')
        .delete()
        .eq('id', id);

      if (error) throw error;

      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
}

export const postService = new PostService();
