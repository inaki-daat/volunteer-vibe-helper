
import React, { createContext, useContext } from 'react';
import { useAuthState } from '@/hooks/useAuthState';
import { useAuthActions } from '@/hooks/useAuthActions';

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
  const { 
    user, 
    profile, 
    loading: stateLoading, 
    authLoading, 
    isNonprofit,
    setLoading: setStateLoading
  } = useAuthState();
  
  const { 
    signIn, 
    signUp, 
    signOut, 
    loading: actionsLoading, 
    setLoading: setActionsLoading 
  } = useAuthActions();

  // Combine loading states
  const loading = stateLoading || actionsLoading;

  const value = {
    user,
    profile,
    loading,
    signIn,
    signUp,
    signOut,
    isNonprofit,
  };

  return (
    <AuthContext.Provider value={value}>
      {!authLoading ? children : (
        <div className="flex items-center justify-center h-screen">
          <div className="text-center">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-muted-foreground">Loading your session... <span className="text-xs">(please wait)</span></p>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
