import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar container">
        <span className="site-footer__copy">© Shraddha's Music Academy</span>

        <div className="site-footer__socials">
          <a href="#" aria-label="Instagram" className="site-footer__social-link">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
          </a>
          <a href="#" aria-label="Facebook" className="site-footer__social-link">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M14.5 8.5H16.5V5.5H14.2C12.2 5.5 10.7 7.06 10.7 9V11H8.5V14H10.7V19H13.7V14H15.9L16.3 11H13.7V9.3C13.7 8.85 14.05 8.5 14.5 8.5Z"
                fill="currentColor"
              />
            </svg>
          </a>
          <a href="#" aria-label="YouTube" className="site-footer__social-link">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" />
            </svg>
          </a>
        </div>

        <nav aria-label="Footer" className="site-footer__nav">
          <ul>
            <li>
              <a href="#privacy">Privacy</a>
            </li>
            <li>
              <a href="#terms">Terms</a>
            </li>
          </ul>
        </nav>
      </div>
    </footer>
  );
}
