// Single source of truth for page-level SEO. Used at runtime (src/components/Seo.jsx)
// and at build time (scripts/prerender-meta.mjs) so crawlers that don't run
// JavaScript still get the right <title>, description and canonical per route.
export const SITE_URL = 'https://www.shraddhasmusicacademy.com';
export const SITE_NAME = "Shraddha's Music Academy";
export const OG_IMAGE = `${SITE_URL}/og-image.png`;

export const PAGES = {
  '/': {
    title: "Online Piano Lessons for Kids | Shraddha's Music Academy",
    description:
      "Fun, personalized 1:1 online piano lessons for young beginners, taught live by Shraddha from the Bay Area, California. Book a free assessment session.",
  },
  '/about': {
    title: "About Shraddha | Piano Teacher | Shraddha's Music Academy",
    description:
      "Meet Shraddha, founder and piano instructor of Shraddha's Music Academy in the Bay Area, California, and learn her playful, student-centered approach to teaching piano.",
  },
  '/how-it-works': {
    title: "How It Works: Free Piano Assessment & Online Lessons | Shraddha's Music Academy",
    description:
      'See how to get started: register, schedule a free assessment session, receive a personalized class plan, then begin 1:1 online piano sessions. Plus what you need at home.',
  },
  '/courseware': {
    title: "Piano Foundations Curriculum & Course Levels | Shraddha's Music Academy",
    description:
      'Explore the Piano Foundations curriculum: structured levels for ages 4–10, from early beginner to confident player, with notation, rhythm, and two-hand coordination.',
  },
  '/contact': {
    title: "Contact Us | Shraddha's Music Academy",
    description:
      "Questions about online piano lessons, scheduling or the curriculum? Send Shraddha's Music Academy a message or email info@shraddhasmusicacademy.com.",
  },
  '/pre-registration': {
    title: "New Student Pre-registration | Shraddha's Music Academy",
    description: "Start here: pre-register a new student for Shraddha's Music Academy's free piano assessment session.",
    noindex: true,
  },
};

export const NOT_FOUND = {
  title: "Page not found | Shraddha's Music Academy",
  description: "Sorry, we couldn't find that page.",
  noindex: true,
};

export function pageFor(pathname) {
  const key = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
  return { path: key, page: PAGES[key] || NOT_FOUND, known: Boolean(PAGES[key]) };
}

export const canonicalFor = (path) => SITE_URL + (path === '/' ? '/' : path);
