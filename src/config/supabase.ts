import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Check if the environment variables are set and are not the placeholder values.
// The app will function in a "demo" mode without a real Supabase connection.
const isConfigured = !!(
  supabaseUrl &&
  supabaseAnonKey &&
  supabaseUrl !== 'YO***************' &&
  supabaseAnonKey !== 'YO********************'
);

// Conditionally create the Supabase client. If not configured, it will be null.
// Services that use this client are responsible for checking if it's null.
export const supabase: SupabaseClient | null = isConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

/**
 * Checks if the Supabase client is properly configured.
 * @returns {boolean} True if configured, false otherwise.
 */
export const isSupabaseConfigured = (): boolean => {
  return isConfigured;
};
