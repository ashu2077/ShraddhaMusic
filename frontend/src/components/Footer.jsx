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
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path
                d="M12 3C7.03 3 3 7.03 3 12c0 1.77.52 3.42 1.42 4.8L3 21l4.33-1.38A8.93 8.93 0 0 0 12 21c4.97 0 9-4.03 9-9s-4.03-9-9-9Z"
                stroke="currentColor"
                strokeWidth="1.6"
              />
              <path
                d="M8.8 8.6c.2-.45.4-.46.6-.47.16 0 .35 0 .5.01.17.01.4-.06.62.48.24.6.8 2.06.87 2.21.08.15.13.33.02.53-.1.2-.16.32-.31.49-.16.17-.33.38-.47.51-.16.15-.32.3-.14.6.19.3.82 1.36 1.77 2.2 1.22 1.08 2.24 1.42 2.55 1.58.3.15.48.13.65-.08.18-.2.76-.89.96-1.2.2-.3.4-.25.66-.15.27.1 1.72.82 2.02.96.3.15.5.22.57.35.08.14.08.78-.19 1.53-.28.75-1.6 1.44-2.21 1.47-.6.03-1.18.26-3.95-.83-3.33-1.32-5.4-4.76-5.57-4.98-.16-.22-1.33-1.77-1.33-3.38 0-1.6.84-2.4 1.14-2.73Z"
                fill="currentColor"
              />
            </svg>
            <span className="site-footer__whatsapp-number">(408) 854-0793</span>
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
