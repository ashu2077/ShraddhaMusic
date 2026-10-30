import { NavLink, useLocation } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import Logo from './Logo.jsx';
import './Header.css';

/*
 * Top menu, grouped so it stays uncluttered as pages are added.
 * Home is reached through the logo. A new page joins an existing group
 * (or becomes a new group) instead of adding another top-level link.
 */
const NAV = [
  { label: 'About', to: '/about' },
  {
    label: 'Classes',
    id: 'classes',
    items: [
      { label: 'Course Offerings', to: '/courseware', desc: 'Levels 0–3 of the Piano Foundations curriculum' },
      { label: 'Pricing', to: '/pricing', desc: 'Lesson packages and rates' },
    ],
  },
  {
    label: 'Social Media',
    id: 'social',
    items: [
      { label: 'Videos', to: '/videos', desc: 'Watch lessons and student performances' },
      { label: 'Instagram', href: 'https://www.instagram.com/shraddhainstudio', desc: '@shraddhainstudio' },
    ],
  },
  {
    label: 'Getting Started',
    id: 'start',
    items: [
      { label: 'How It Works', to: '/how-it-works', desc: 'From first message to first lesson' },
      { label: 'Assessment Request (Free)', to: '/pre-registration', desc: '30-minute session for new students' },
    ],
  },
  { label: 'Contact', to: '/contact' },
];

const CTA = { label: 'Book a free assessment', to: '/pre-registration' };

function Chevron() {
  return (
    <svg className="site-header__chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 9l6 6 6-6" />
    </svg>
  );
}

function SubLink({ item, className, onClick, children }) {
  if (item.href) {
    return (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onClick}>
        {children}
      </a>
    );
  }
  return (
    <NavLink to={item.to} className={({ isActive }) => className + (isActive ? ' is-active' : '')} onClick={onClick}>
      {children}
    </NavLink>
  );
}

const groupIsActive = (group, pathname) => group.items.some((i) => i.to && i.to === pathname);

export default function Header() {
  const { pathname } = useLocation();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openMenu, setOpenMenu] = useState(null); // desktop dropdown id
  const [openSection, setOpenSection] = useState(null); // mobile accordion id
  const navRef = useRef(null);

  // Close menus when the page changes.
  useEffect(() => {
    setOpenMenu(null);
    setDrawerOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

  // Close the desktop dropdown on outside click or Escape.
  useEffect(() => {
    if (!openMenu) return undefined;
    const onPointer = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) setOpenMenu(null);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenMenu(null);
    };
    document.addEventListener('mousedown', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [openMenu]);

  return (
    <header className="site-header">
      <div className="site-header__bar container">
        <NavLink to="/" className="site-header__logo-link" aria-label="Shraddha's Music Academy home">
          <Logo className="site-header__logo" />
        </NavLink>

        <nav className="site-header__nav" aria-label="Primary" ref={navRef}>
          <ul className="site-header__list">
            {NAV.map((entry) =>
              entry.items ? (
                <li key={entry.id} className="site-header__group">
                  <button
                    type="button"
                    className={
                      'site-header__nav-link site-header__group-btn' +
                      (openMenu === entry.id || groupIsActive(entry, pathname) ? ' is-active' : '')
                    }
                    aria-expanded={openMenu === entry.id}
                    aria-controls={`menu-${entry.id}`}
                    onClick={() => setOpenMenu(openMenu === entry.id ? null : entry.id)}
                  >
                    {entry.label}
                    <Chevron />
                  </button>
                  {openMenu === entry.id && (
                    <ul id={`menu-${entry.id}`} className="site-header__dropdown">
                      {entry.items.map((item) => (
                        <li key={item.label}>
                          <SubLink item={item} className="site-header__dropdown-link" onClick={() => setOpenMenu(null)}>
                            <span className="site-header__dropdown-title">{item.label}</span>
                            <span className="site-header__dropdown-desc">{item.desc}</span>
                          </SubLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={entry.to}>
                  <NavLink
                    to={entry.to}
                    className={({ isActive }) => 'site-header__nav-link' + (isActive ? ' is-active' : '')}
                  >
                    {entry.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <NavLink to={CTA.to} className="btn btn-gold site-header__cta">
            {CTA.label}
          </NavLink>
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

      <div className={'site-drawer' + (drawerOpen ? ' is-open' : '')} aria-hidden={!drawerOpen}>
        <button
          type="button"
          className="site-drawer__close"
          aria-label="Close menu"
          onClick={() => setDrawerOpen(false)}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        <nav aria-label="Mobile primary">
          <ul>
            <li>
              <NavLink to="/" end className={({ isActive }) => 'site-drawer__link' + (isActive ? ' is-active' : '')}>
                Home
              </NavLink>
            </li>
            {NAV.map((entry) =>
              entry.items ? (
                <li key={entry.id} className="site-drawer__group">
                  <button
                    type="button"
                    className="site-drawer__link site-drawer__group-btn"
                    aria-expanded={openSection === entry.id}
                    aria-controls={`drawer-${entry.id}`}
                    onClick={() => setOpenSection(openSection === entry.id ? null : entry.id)}
                  >
                    {entry.label}
                    <Chevron />
                  </button>
                  {openSection === entry.id && (
                    <ul id={`drawer-${entry.id}`} className="site-drawer__sub">
                      {entry.items.map((item) => (
                        <li key={item.label}>
                          <SubLink item={item} className="site-drawer__sublink" onClick={() => setDrawerOpen(false)}>
                            {item.label}
                          </SubLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={entry.to}>
                  <NavLink to={entry.to} className={({ isActive }) => 'site-drawer__link' + (isActive ? ' is-active' : '')}>
                    {entry.label}
                  </NavLink>
                </li>
              )
            )}
          </ul>

          <NavLink to={CTA.to} className="btn btn-gold site-drawer__cta">
            {CTA.label}
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
