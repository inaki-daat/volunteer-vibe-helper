
import React, { useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

type PrivateRouteProps = {
  requireNonprofit?: boolean;
};

const PrivateRoute: React.FC<PrivateRouteProps> = ({ requireNonprofit = false }) => {
  const { user, profile, isNonprofit } = useAuth();
  const location = useLocation();

  // Add debugging logs
  console.log('PrivateRoute rendering with:', { 
    user: !!user, 
    profile: !!profile,
    isNonprofit,
    requireNonprofit,
    currentPath: location.pathname
  });

  useEffect(() => {
    console.log('PrivateRoute mounted with isNonprofit:', isNonprofit);
  }, [isNonprofit]);

  if (!user) {
    // If not logged in, redirect to auth page
    console.log('No user, redirecting to /auth');
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireNonprofit && !isNonprofit) {
    // If this route requires nonprofit status but user is not a nonprofit
    console.log('User is not a nonprofit, redirecting to /home');
    return <Navigate to="/home" replace />;
  }

  if (isNonprofit && location.pathname === '/home') {
    // If user is a nonprofit but trying to access volunteer home
    console.log('Nonprofit accessing /home, redirecting to /nonprofit/home');
    return <Navigate to="/nonprofit/home" replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;
