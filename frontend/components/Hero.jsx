// Hero Section Component for Shraddha Music School
// Based on design system with piano and keyboard theme

import React from 'react';
import './Hero.css';

const Hero = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1 className="hero-title">🎹 Welcome to Shraddha Music School</h1>
        <p className="hero-subtitle">
          Master Piano & Keyboard Music Through Expert Online Learning
        </p>
        
        <div className="hero-cta">
          <button className="btn btn-primary">
            Start Your Free Trial
          </button>
          <button className="btn btn-secondary">
            Explore Courses
          </button>
        </div>
      </div>
      
      <div className="hero-background">
        {/* Piano keyboard decoration */}
        <svg className="piano-keys" viewBox="0 0 400 100" preserveAspectRatio="none">
          {/* Piano keys SVG pattern - repeating */}
          <g opacity="0.1">
            {[...Array(20)].map((_, i) => (
              <rect key={i} x={i * 20} y="0" width="18" height="100" fill="#667eea" />
            ))}
          </g>
        </svg>
      </div>
    </section>
  );
};

export default Hero;
