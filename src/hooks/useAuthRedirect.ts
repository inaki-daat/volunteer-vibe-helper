
import { useNavigate } from 'react-router-dom';

export const useAuthRedirect = () => {
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

  return {
    redirectBasedOnRole,
    navigate
  };
};
