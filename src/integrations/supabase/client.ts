
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qlrssqljqxkeienjixqw.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFscnNzcWxqcXhrZWllbmppeHF3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE1ODM2OTAsImV4cCI6MjA1NzE1OTY5MH0.VXEh1a_kwX5zEl148jL6Zev3pMitxvHyUoUlgQXByF0";

// Get the current URL for redirects
const getRedirectTo = () => {
  // Use window location origin when in browser environment
  if (typeof window !== 'undefined') {
    return window.location.origin;
  }
  
  // Fallback for SSR
  return 'https://qlrssqljqxkeienjixqw.lovableproject.com';
};

// Export the supabase client with redirect configuration
export const supabase = createClient<Database>(
  SUPABASE_URL, 
  SUPABASE_PUBLISHABLE_KEY,
  {
    auth: {
      autoRefreshToken: true,
      persistSession: true,
      redirectTo: getRedirectTo()
    }
  }
);
