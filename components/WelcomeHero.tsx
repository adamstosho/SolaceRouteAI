'use client';

import React from 'react';
import { motion } from 'framer-motion';

export function WelcomeHero() {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="relative mx-auto mb-6 flex h-32 w-32 items-center justify-center sm:h-40 sm:w-40">
      {/* Background Glow / Aura */}
      <motion.div
        className="absolute inset-0 rounded-[2.5rem] bg-primary/20 blur-3xl sm:rounded-[3.5rem]"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Main Container */}
      <motion.div
        className="relative z-10 flex h-24 w-24 items-center justify-center rounded-[2.2rem] border border-primary/20 bg-card/40 shadow-2xl backdrop-blur-md sm:h-32 sm:w-32 sm:rounded-[2.8rem]"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Animated Logo SVG (Pin + Circuit Design) */}
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="p-4 sm:p-5"
        >
          <style>
            {`
              .path-hero {
                stroke: #1D9E75;
                stroke-width: 4;
                stroke-linecap: round;
                stroke-dasharray: 100;
                stroke-dashoffset: 100;
                animation: drawHero 2.5s ease-out forwards;
              }
              .node-hero {
                fill: #1D9E75;
                opacity: 0;
                animation: fadeInHero 0.5s ease-out forwards;
              }
              @keyframes drawHero {
                to { stroke-dashoffset: 0; }
              }
              @keyframes fadeInHero {
                to { opacity: 1; }
              }
            `}
          </style>
          
          {/* Pin Silhouette */}
          <motion.path 
            d="M50 90C50 90 85 65 85 45C85 25.67 69.33 10 50 10C30.67 10 15 25.67 15 45C15 65 50 90 50 90Z" 
            fill="#0D1B2A" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Circuit Paths */}
          <g transform="translate(50, 50)">
            <path className="path-hero" d="M0 25V0" style={{ animationDelay: '0.2s' }} />
            <path className="path-hero" d="M0 0C6 -6 12 -8 15 -18" style={{ animationDelay: '0.6s' }} />
            <path className="path-hero" d="M0 0C-6 -6 -12 -10 -15 -12" style={{ animationDelay: '1s' }} />
            <path className="path-hero" d="M0 0V-22" style={{ animationDelay: '1.4s' }} />
            
            {/* Pulsing Nodes */}
            <circle className="node-hero" style={{ animationDelay: '2.4s' }} cx="15" cy="-18" r="4" />
            <circle className="node-hero" style={{ animationDelay: '2.8s' }} cx="-15" cy="-12" r="4" />
            <circle className="node-hero" style={{ animationDelay: '3.2s' }} cx="0" cy="-22" r="5" />
          </g>
        </svg>

        {/* Dynamic "Flow" Particles */}
        {isMounted && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute h-1.5 w-1.5 rounded-full bg-primary/40"
                initial={{
                  x: '50%',
                  y: '50%',
                  opacity: 0,
                  scale: 0,
                }}
                animate={{
                  x: [`50%`, `${20 + (i * 15) % 60}%`, `${10 + (i * 20) % 80}%`],
                  y: [`50%`, `${30 + (i * 10) % 40}%`, `${10 + (i * 15) % 80}%`],
                  opacity: [0, 1, 0],
                  scale: [0, 1, 0.5],
                }}
                transition={{
                  duration: 3 + (i % 3),
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: 'easeInOut',
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Orbiting Ring */}
      <motion.div
        className="absolute h-36 w-36 rounded-full border border-primary/10 sm:h-48 sm:w-48"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      >
        <div className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-primary/30" />
      </motion.div>
    </div>
  );
}
