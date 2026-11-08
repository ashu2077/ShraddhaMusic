import { useEffect, useRef, useState } from 'react';

/*
 * Embeds one Instagram post or reel using Instagram's official embed code.
 * Instagram's script (embed.js) is only loaded once the embed is about to
 * scroll into view, so it adds nothing to the first screen's load time.
 * Until then, and if the script is blocked, a plain link to the post shows.
 */

const EMBED_SCRIPT = 'https://www.instagram.com/embed.js';

function processEmbeds() {
  window.instgrm?.Embeds?.process();
}

function loadEmbedScript() {
  const existing = document.querySelector(`script[src="${EMBED_SCRIPT}"]`);
  if (existing) {
    if (window.instgrm) processEmbeds();
    else existing.addEventListener('load', processEmbeds, { once: true });
    return;
  }
  const script = document.createElement('script');
  script.src = EMBED_SCRIPT;
  script.async = true;
  script.addEventListener('load', processEmbeds, { once: true });
  document.body.appendChild(script);
}

export default function InstagramReel({ url, label }) {
  const boxRef = useRef(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = boxRef.current;
    if (!el) return undefined;
    if (!('IntersectionObserver' in window)) {
      setNear(true);
      return undefined;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      { rootMargin: '400px 0px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (near) loadEmbedScript();
  }, [near]);

  return (
    <div ref={boxRef} className="ig-reel">
      {near ? (
        <blockquote
          className="instagram-media"
          data-instgrm-permalink={`${url}?utm_source=ig_embed&utm_campaign=loading`}
          data-instgrm-version="14"
        >
          <a href={url} target="_blank" rel="noopener noreferrer" className="ig-reel__fallback">
            {label}
          </a>
        </blockquote>
      ) : (
        <a href={url} target="_blank" rel="noopener noreferrer" className="ig-reel__fallback">
          {label}
        </a>
      )}
    </div>
  );
}
