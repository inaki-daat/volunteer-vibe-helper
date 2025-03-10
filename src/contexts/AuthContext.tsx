
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
    if (role === 'nonprofit') {
      navigate('/nonprofit/home');
    } else {
      navigate('/home'); // Volunteer goes to home
    }
  };

  useEffect(() => {
    const handleRedirectResult = async () => {
      if (window.location.hash.includes('access_token')) {
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
            redirectBasedOnRole(profileData.role);
          } else {
            navigate('/home');
          }
          
          toast.success('Successfully signed in!');
        }
      }
    };

    const getSession = async () => {
      const { data, error } = await supabase.auth.getSession();
      
      if (error) {
        console.error('Error fetching session:', error);
        setAuthLoading(false);
        return;
      }
      
      if (data.session) {
        setUser(data.session.user);
        await fetchProfile(data.session.user.id);
      }
      
      setAuthLoading(false);
    };

    handleRedirectResult().then(getSession);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event);
        if (event === 'SIGNED_IN' && session) {
          setUser(session.user);
          const profileData = await fetchProfile(session.user.id);
          
          if (profileData) {
            redirectBasedOnRole(profileData.role);
          }
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setIsNonprofit(false);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, [navigate]);

  const fetchProfile = async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', userId as string)
      .maybeSingle();

    if (error) {
      console.error('Error fetching profile:', error);
      return null;
    }

    if (data) {
      setProfile(data);
      setIsNonprofit(data.role === 'nonprofit');
      return data;
    }
    
    return null;
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
      
      // Automatically redirect based on role after successful signup
      if (data.user) {
        setIsNonprofit(role === 'nonprofit');
        redirectBasedOnRole(role);
      }
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

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
