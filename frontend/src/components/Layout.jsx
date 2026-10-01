import { Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Header from './Header.jsx';
import Footer from './Footer.jsx';
import Watermark from './Watermark.jsx';
import './Layout.css';

export default function Layout() {
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <Header />
      <main className="site-main">
        <Watermark />
        <div className="site-main__content">
          <Outlet />
        </div>
      </main>
      <Footer />
    </>
  );
}
