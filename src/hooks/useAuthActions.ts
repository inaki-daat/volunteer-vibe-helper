
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export const useAuthActions = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      if (data) {
        console.log('Sign in successful:', data);
      }
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'volunteer' | 'nonprofit', additionalData?: Record<string, any>) => {
    setLoading(true);
    
    try {
      // Create the user metadata object with the correct structure
      const userData = {
        full_name: fullName,
        role, // Pass as string, the database function will handle casting to enum
      };
      
      // Add any additional data as top-level properties in the metadata
      if (additionalData) {
        Object.keys(additionalData).forEach(key => {
          userData[key] = additionalData[key];
        });
      }
      
      console.log('Signing up with userData:', userData);
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      
      toast.success('Successfully signed up! Please check your email for verification.');
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast.error(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      toast.success('Successfully signed out');
      navigate('/');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign out');
    }
  };

  return {
    signIn,
    signUp,
    signOut,
    loading,
    setLoading
  };
};
