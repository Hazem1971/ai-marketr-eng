import { supabase } from '../config/supabase';
import type { User } from '../types';

const NOT_CONFIGURED_ERROR_MSG = 'Supabase is not configured. Please add your Supabase URL and Anon Key to the .env file.';
const NOT_CONFIGURED_ERROR = { user: null, error: new Error(NOT_CONFIGURED_ERROR_MSG) };
const NOT_CONFIGURED_ERROR_GENERIC = { error: new Error(NOT_CONFIGURED_ERROR_MSG) };

export class AuthService {
  async signUp(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR;
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user as User, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  }

  async signIn(email: string, password: string): Promise<{ user: User | null; error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR;
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      return { user: data.user as User, error: null };
    } catch (error) {
      return { user: null, error: error as Error };
    }
  }

  async signOut(): Promise<{ error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR_GENERIC;
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }

  async getCurrentUser(): Promise<User | null> {
    if (!supabase) return null;
    try {
      const { data: { user } } = await supabase.auth.getUser();
      return user as User;
    } catch {
      return null;
    }
  }

  async resetPassword(email: string): Promise<{ error: Error | null }> {
    if (!supabase) return NOT_CONFIGURED_ERROR_GENERIC;
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email);
      if (error) throw error;
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  }
}

export const authService = new AuthService();
