
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useProfile } from './useProfile';
import { useAuthRedirect } from './useAuthRedirect';

export const useAuthState = () => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const { profile, isNonprofit, fetchProfile, setProfile, setIsNonprofit } = useProfile();
  const { redirectBasedOnRole, navigate } = useAuthRedirect();

  useEffect(() => {
    let isMounted = true;
    let sessionCheckTimeout: NodeJS.Timeout | null = null;
    
    const handleRedirectResult = async () => {
      if (window.location.hash.includes('access_token')) {
        console.log('Handling redirect result from hash');
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          console.error('Error handling redirect:', error);
          toast.error('Authentication failed during redirect');
          return;
        }
        
        if (data.session) {
          setUser(data.session.user);
          const profileData = await fetchProfile(data.session.user.id);
          window.history.replaceState(null, '', window.location.pathname);
          
          if (profileData) {
            console.log('Profile found during redirect handling, redirecting based on role:', profileData.role);
            redirectBasedOnRole(profileData.role);
          } else {
            navigate('/home');
          }
          
          toast.success('Successfully signed in!');
        }
      }
    };

    const getSession = async () => {
      try {
        console.log('Fetching initial session');
        const { data, error } = await supabase.auth.getSession();
        
        if (error) {
          console.error('Error fetching session:', error);
          if (isMounted) setAuthLoading(false);
          return;
        }
        
        if (data.session) {
          console.log('Session found:', data.session.user.id);
          if (isMounted) setUser(data.session.user);
          const profileData = await fetchProfile(data.session.user.id);
          console.log('Profile data from session:', profileData);
          
          if (window.location.pathname === '/auth' && profileData) {
            console.log('On auth page with profile data, redirecting based on role:', profileData.role);
            redirectBasedOnRole(profileData.role);
          }
        }
        
        if (isMounted) setAuthLoading(false);
      } catch (error) {
        console.error('Unexpected error in getSession:', error);
        if (isMounted) setAuthLoading(false);
      }
    };

    handleRedirectResult().then(() => {
      getSession();
      
      sessionCheckTimeout = setTimeout(() => {
        if (isMounted && authLoading) {
          console.log('Session check timed out, forcing authLoading to false');
          setAuthLoading(false);
        }
      }, 5000);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (event === 'SIGNED_IN' && session) {
          if (isMounted) setUser(session.user);
          const profileData = await fetchProfile(session.user.id);
          
          if (profileData && isMounted) {
            console.log('Profile data after sign in:', profileData);
            setIsNonprofit(profileData.role === 'nonprofit');
            console.log('Is nonprofit:', profileData.role === 'nonprofit');
            redirectBasedOnRole(profileData.role);
          }
          if (isMounted) setAuthLoading(false);
        } else if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setUser(null);
            setProfile(null);
            setIsNonprofit(false);
            navigate('/auth');
            setAuthLoading(false);
          }
        } else if (event === 'TOKEN_REFRESHED') {
          if (isMounted) setAuthLoading(false);
        }
      }
    );

    return () => {
      isMounted = false;
      if (sessionCheckTimeout) clearTimeout(sessionCheckTimeout);
      authListener.subscription.unsubscribe();
    };
  }, [navigate, fetchProfile, redirectBasedOnRole, setIsNonprofit, setProfile]);

  return {
    user,
    profile,
    loading, 
    authLoading,
    isNonprofit,
    setLoading,
    setAuthLoading
  };
};
