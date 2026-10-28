import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar container">
        <span className="site-footer__copy">© Shraddha's Music Academy</span>

        <div className="site-footer__socials">
          <a
            href="https://wa.me/14088540793"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="WhatsApp (408) 854-0793"
            className="site-footer__social-link site-footer__whatsapp"
          >
            <img src="/assets/images/whatsapp-logo.png" alt="" className="site-footer__whatsapp-icon" />
            <span className="site-footer__whatsapp-number">WhatsApp (408) 854-0793</span>
          </a>
          <a
            href="https://www.instagram.com/shraddhainstudio"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="site-footer__social-link"
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
              <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
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
              <rect x="2.5" y="6" width="19" height="12" rx="3.5" stroke="currentColor" strokeWidth="1.6" />
              <path d="M10.5 9.5L15 12L10.5 14.5V9.5Z" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
