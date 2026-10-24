// Latest videos from https://www.youtube.com/@shraddhainstudio
// Fill in `id` (the v= value from the video URL), `title`, `publishedAt` (ISO date) and
// `duration` for each entry. The page sorts by `publishedAt`, newest first, and links out
// to YouTube; nothing is downloaded or re-hosted. Entries with a null `id` render as
// placeholders that link to the channel.
export const CHANNEL_URL = 'https://www.youtube.com/@shraddhainstudio';
export const CHANNEL_VIDEOS_URL = `${CHANNEL_URL}/videos`;

export const VIDEOS = Array.from({ length: 10 }, (_, i) => ({
  id: null,
  title: `[Video title ${i + 1}]`,
  publishedAt: null,
  duration: null,
}));
