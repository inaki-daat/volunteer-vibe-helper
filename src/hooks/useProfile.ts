
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export const useProfile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [isNonprofit, setIsNonprofit] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      console.log('Fetching profile for user ID:', userId);
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching profile:', error);
        return null;
      }

      if (data) {
        console.log('Profile data retrieved:', data);
        setProfile(data);
        setIsNonprofit(data.role === 'nonprofit');
        console.log('Is nonprofit set to:', data.role === 'nonprofit');
        return data;
      }
      
      return null;
    } catch (error) {
      console.error('Exception in fetchProfile:', error);
      return null;
    }
  };

  return {
    profile,
    isNonprofit,
    fetchProfile,
    setProfile,
    setIsNonprofit
  };
};
