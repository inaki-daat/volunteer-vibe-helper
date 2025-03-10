import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

type AuthContextType = {
  user: any;
  profile: any;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, fullName: string, role: 'volunteer' | 'nonprofit', additionalData?: Record<string, any>) => Promise<void>;
  signOut: () => Promise<void>;
  isNonprofit: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [authLoading, setAuthLoading] = useState(true);
  const [isNonprofit, setIsNonprofit] = useState(false);
  const navigate = useNavigate();

  const redirectBasedOnRole = (role: string) => {
    console.log('Redirecting based on role:', role);
    if (role === 'nonprofit') {
      console.log('Redirecting to nonprofit home');
      navigate('/nonprofit/home');
    } else {
      console.log('Redirecting to volunteer home');
      navigate('/home'); // Volunteer goes to home
    }
  };

  useEffect(() => {
    // Track whether the component is mounted to prevent state updates after unmounting
    let isMounted = true;
    
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
          
          // Only redirect if we're on the auth page
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

    // Execute these functions in sequence
    handleRedirectResult().then(() => getSession());

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
        } else if (event === 'SIGNED_OUT') {
          if (isMounted) {
            setUser(null);
            setProfile(null);
            setIsNonprofit(false);
            navigate('/auth');
          }
        }
      }
    );

    // Cleanup function
    return () => {
      isMounted = false;
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

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

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      // If we get here, sign in was successful
      // The redirection will be handled by the onAuthStateChange listener
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign in');
    } finally {
      setLoading(false); // Make sure loading state is reset regardless of outcome
    }
  };

  const signUp = async (email: string, password: string, fullName: string, role: 'volunteer' | 'nonprofit', additionalData?: Record<string, any>) => {
    setLoading(true);
    
    try {
      const userData = {
        full_name: fullName,
        role: role,
        ...additionalData
      };
      
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: userData,
        },
      });

      if (error) throw error;
      
      toast.success('Successfully signed up! Please check your email for verification.');
      
      // The actual redirection will happen through the onAuthStateChange listener
      // after email verification (if required) and profile creation
      setIsNonprofit(role === 'nonprofit');
    } catch (error: any) {
      toast.error(error.message || 'An error occurred during sign up');
    } finally {
      setLoading(false); // Make sure loading state is reset regardless of outcome
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

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isNonprofit,
  };

  return <AuthContext.Provider value={value}>{!authLoading ? children : (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-muted-foreground">Loading your session... <span className="text-xs">(please wait)</span></p>
      </div>
    </div>
  )}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
