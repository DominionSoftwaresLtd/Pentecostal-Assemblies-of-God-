import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant',
      });
    } else {
      const id = hash.replace('#', '');
      const scroll = () => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      };
      scroll();
      const t = setTimeout(scroll, 150);
      return () => clearTimeout(t);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
