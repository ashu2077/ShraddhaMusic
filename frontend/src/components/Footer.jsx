import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="site-footer__bar container">
        <span>© Shraddha's Music Academy</span>
        <nav aria-label="Footer">
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
