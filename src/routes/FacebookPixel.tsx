// src/components/FacebookPixel.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactPixel from 'react-facebook-pixel';

const pixelOptions = {
  autoConfig: true,
  debug: false,
};

const FacebookPixel: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === '/') {
      ReactPixel.init('477842931244028', {}, pixelOptions);
      ReactPixel.pageView(); // For tracking page view
    } else if (location.pathname === '/ads') {
      ReactPixel.init('763698079286702', {}, pixelOptions);
      ReactPixel.pageView(); // For tracking page view
    }
  }, [location.pathname]);

  return null;
};

export default FacebookPixel;
