import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Logo from './Logo.jsx';
import './Header.css';

const NAV_ITEMS = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'How It Works', to: '/how-it-works' },
  { label: 'Courseware', to: '/courseware' },
  { label: 'Piano Recommendation', to: '/piano-recommendation' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <NavLink to="/" className="site-header__logo-link" aria-label="Shraddha's Music Academy home">
          <Logo className="site-header__logo" />
        </NavLink>

        <nav className="site-header__nav" aria-label="Primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => 'site-header__nav-link' + (isActive ? ' is-active' : '')}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <button
          type="button"
          className="site-header__menu-btn"
          aria-label="Open menu"
          aria-expanded={drawerOpen}
          onClick={() => setDrawerOpen(true)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={'site-drawer' + (drawerOpen ? ' is-open' : '')}>
        <button
          type="button"
          className="site-drawer__close"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        >
          ✕
        </button>
        <nav aria-label="Mobile primary">
          <ul>
            {NAV_ITEMS.map((item) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => 'site-drawer__link' + (isActive ? ' is-active' : '')}
                  onClick={() => setDrawerOpen(false)}
                >
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
