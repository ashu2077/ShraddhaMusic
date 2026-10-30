import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar container">
        <span className="site-footer__copy">
          <img src="/assets/images/logo-coin.png" alt="" className="site-footer__logo" />
          © Shraddha's Music Academy
        </span>

        <div className="site-footer__contact">
          <a
            href="https://wa.me/14088540793"
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__contact-link"
          >
            <span className="site-footer__contact-icon site-footer__contact-icon--whatsapp" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M20.5 11.5a8.5 8.5 0 0 1-12.4 7.6L3.5 20.5l1.4-4.4A8.5 8.5 0 1 1 20.5 11.5z" />
              </svg>
            </span>
            WhatsApp (408) 854-0793
          </a>
          <a href="mailto:info@shraddhasmusicacademy.com" className="site-footer__contact-link">
            <span className="site-footer__contact-icon site-footer__contact-icon--email" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3.5 7l8.5 6 8.5-6" />
              </svg>
            </span>
            info@shraddhasmusicacademy.com
          </a>
        </div>

        <div className="site-footer__socials">
          <a
            href="https://www.instagram.com/shraddhainstudio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="site-footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.8" />
              <circle cx="17.4" cy="6.6" r="1.1" fill="currentColor" />
            </svg>
          </a>
          <a
            href="https://youtube.com/@shraddhainstudio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="site-footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.8" />
              <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
