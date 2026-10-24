import { useEffect, useRef, useState } from 'react';
import { CHANNEL_URL, CHANNEL_VIDEOS_URL, VIDEOS } from '../data/youtubeVideos.js';
import './Videos.css';

const MAX_VIDEOS = 10;
const HOVER_DELAY_MS = 250;

const byNewest = (a, b) => (Date.parse(b.publishedAt) || 0) - (Date.parse(a.publishedAt) || 0);

const formatDate = (iso) =>
  iso
    ? new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

function PlayIcon() {
  return (
    <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24">
      <path d="M8 5v14l11-7z" fill="currentColor" />
    </svg>
  );
}

function VideoCard({ video }) {
  const href = video.id ? `https://www.youtube.com/watch?v=${video.id}` : CHANNEL_VIDEOS_URL;
  const date = formatDate(video.publishedAt);
  const [playing, setPlaying] = useState(false);
  const timer = useRef(null);

  // Preview plays inline while the tile is hovered or keyboard-focused; the tile itself
  // stays a link, so a click still opens the video on YouTube.
  const start = () => {
    if (!video.id) return;
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setPlaying(true), HOVER_DELAY_MS);
  };
  const stop = () => {
    clearTimeout(timer.current);
    setPlaying(false);
  };
  useEffect(() => () => clearTimeout(timer.current), []);

  return (
    <a
      className="videos__card"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={start}
      onMouseLeave={stop}
      onFocus={start}
      onBlur={stop}
    >
      <span className="videos__thumb">
        {video.id && (
          <img
            src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
            alt=""
            loading="lazy"
            className="videos__thumb-img"
          />
        )}
        {playing && (
          <iframe
            className="videos__player"
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&mute=1&controls=0&playsinline=1&loop=1&playlist=${video.id}&rel=0&modestbranding=1`}
            title={`Preview: ${video.title}`}
            allow="autoplay; encrypted-media"
            tabIndex={-1}
          />
        )}
        <span className={'videos__play' + (playing ? ' is-hidden' : '')}>
          <PlayIcon />
        </span>
        {video.duration && <span className="videos__dur">{video.duration}</span>}
      </span>
      <span className="videos__title">{video.title}</span>
      {date && <span className="videos__date">{date}</span>}
    </a>
  );
}

export default function Videos() {
  const videos = [...VIDEOS].sort(byNewest).slice(0, MAX_VIDEOS);

  return (
    <>
      <section className="videos__hero">
        <div className="container videos__hero-inner">
          <p className="videos__caption">Video library</p>
          <h1 className="videos__heading">Checkout my latest videos</h1>
          <p className="videos__lead">
            Visit often to see the latest videos or you can subscribe and get notified when a new
            one is posted.
          </p>
          <a className="btn btn-gold" href={CHANNEL_URL} target="_blank" rel="noopener noreferrer">
            Subscribe on YouTube
          </a>
        </div>
      </section>

      <section className="videos page-section" aria-labelledby="videos-latest">
        <div className="container">
          <div className="videos__intro">
            <h2 id="videos-latest" className="videos__section-heading">
              Latest videos
            </h2>
            <a href={CHANNEL_VIDEOS_URL} target="_blank" rel="noopener noreferrer" className="videos__all">
              See all on YouTube
            </a>
          </div>

          <ul className="videos__grid">
            {videos.map((video, i) => (
              <li key={video.id || i}>
                <VideoCard video={video} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
