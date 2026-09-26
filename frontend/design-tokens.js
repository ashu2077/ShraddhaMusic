// Shraddha Music School - Design Tokens
// Use these tokens consistently across all components

export const colors = {
  primary: {
    navy: '#1a1a2e',
    purple: '#667eea',
    magenta: '#764ba2',
  },
  neutral: {
    white: '#ffffff',
    lightGray: '#f0f0f0',
    mediumGray: '#999999',
    darkGray: '#333333',
    black: '#000000',
  },
  accent: {
    gold: '#ffd60a',
  },
  gradient: {
    header: 'linear-gradient(135deg, #1a1a2e 0%, #2d3561 100%)',
    card: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  },
};

export const typography = {
  fonts: {
    heading: "'Georgia', serif",
    body: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    accent: "'Courier New', monospace",
  },
  sizes: {
    h1: '2.5rem',
    h2: '1.8rem',
    h3: '1.4rem',
    h4: '1.2rem',
    body: '1rem',
    small: '0.875rem',
  },
  weights: {
    light: 300,
    regular: 400,
    medium: 500,
    bold: 700,
  },
};

export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '24px',
  xl: '40px',
  xxl: '60px',
};

export const borderRadius = {
  sm: '4px',
  md: '8px',
  lg: '12px',
  full: '50%',
};

export const shadows = {
  subtle: '0 2px 4px rgba(0, 0, 0, 0.1)',
  medium: '0 4px 12px rgba(0, 0, 0, 0.15)',
  large: '0 10px 40px rgba(0, 0, 0, 0.1)',
};

export const breakpoints = {
  mobile: '480px',
  tablet: '768px',
  desktop: '1024px',
  wide: '1440px',
};
