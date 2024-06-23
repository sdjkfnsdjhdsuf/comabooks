import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const UserChecker: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkUserAnalytics = async () => {
      const token = localStorage.getItem('token');

      try {
        const response = await fetch('https://api.comabooks.org/user_anal', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();

        const formsPathRegex = /^\/forms(\/.*)?$/;

        if (formsPathRegex.test(location.pathname) && (!data || data.length === 0)) {
          navigate('/analytics');
          console.log('NO DATA');
        }
        if (formsPathRegex.test(location.pathname) && (!token)) {
            navigate('/');
            console.log('NO AUTH');
        }
        if ((location.pathname === '/analytics') && (data)) {
            navigate('/forms');
            console.log('WE HAVE DATA');
        }

        if(formsPathRegex.test(location.pathname) && data.status === 'done') {
            navigate('/onhold')
        }
      } catch (error) {
        const formsPathRegex = /^\/forms(\/.*)?$/;

        if (formsPathRegex.test(location.pathname)) {
          navigate('/analytics');
          console.log('NO DATA');
        }
      }
    };

    checkUserAnalytics();
  }, [navigate, location.pathname]);

  return (
    <div>
    </div>
  );
};

export default UserChecker;
