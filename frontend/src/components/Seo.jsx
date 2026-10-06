import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { OG_IMAGE, canonicalFor, pageFor } from '../config/seo.js';

function setMeta(attr, key, content) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

// Keeps <head> in sync with the current route on client-side navigation.
// The initial HTML for each route is already correct (see scripts/prerender-meta.mjs).
export default function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const { path, page, known } = pageFor(pathname);
    const url = canonicalFor(known ? path : '/');

    document.title = page.title;
    setMeta('name', 'description', page.description);
    setMeta('name', 'robots', page.noindex ? 'noindex, follow' : 'index, follow');
    setMeta('property', 'og:title', page.title);
    setMeta('property', 'og:description', page.description);
    setMeta('property', 'og:url', url);
    setMeta('property', 'og:image', OG_IMAGE);
    setMeta('name', 'twitter:title', page.title);
    setMeta('name', 'twitter:description', page.description);

    let link = document.head.querySelector('link[rel="canonical"]');
    if (!link) {
      link = document.createElement('link');
      link.setAttribute('rel', 'canonical');
      document.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }, [pathname]);

  return null;
}
