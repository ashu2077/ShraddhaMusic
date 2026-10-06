import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <section className="page-section">
      <div className="container" style={{ textAlign: 'center' }}>
        <h1>Page not found</h1>
        <p style={{ margin: '12px 0 24px' }}>Sorry, we couldn&rsquo;t find the page you were looking for.</p>
        <Link to="/" className="btn btn-gold">
          Back to home
        </Link>
      </div>
    </section>
  );
}
