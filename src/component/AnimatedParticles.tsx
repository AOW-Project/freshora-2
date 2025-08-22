{/*'use client';

import React, { useState, useEffect, useMemo } from "react";
import Image from 'next/image';

interface ParticleStyle extends React.CSSProperties {
  '--left-start': string;
  '--delay': string;
  '--duration': string;
  '--x-drift': string;
}

interface Particle {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  style: ParticleStyle;
}

// ✅ Add zIndex to props
interface AnimatedParticlesProps {
  zIndex?: number;
}

const AnimatedParticles: React.FC<AnimatedParticlesProps> = ({ zIndex = -10 }) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { setIsMounted(true); }, []);

  const particles = useMemo(() => {
    const starImages = [
      '/images/stars-01.png', '/images/stars-02.png', '/images/stars-03.png',
      '/images/stars-04.png', '/images/stars-05.png'
    ];
    const bubbleImages = [
      '/images/bubbles-01.png', '/images/bubbles-02.png', '/images/bubbles-03.png',
      '/images/bubbles-04.png', '/images/bubbles-05.png', '/images/bubbles-06.png',
      '/images/bubbles-07.png', '/images/bubbles-08.png', '/images/bubbles-09.png',
      '/images/bubbles-10.png', '/images/bubbles-11.png'
    ];

    return Array.from({ length: 25 }).map((_, i) => {
      const isStar = Math.random() > 0.6;
      const imageArray = isStar ? starImages : bubbleImages;
      const src = imageArray[Math.floor(Math.random() * imageArray.length)];
      const size = Math.floor(Math.random() * (isStar ? 40 : 80) + 20);
      return {
        id: i,
        src,
        alt: isStar ? 'star' : 'bubble',
        width: size,
        height: size,
        style: {
          '--left-start': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 20}s`,
          '--duration': `${Math.random() * 20 + 15}s`,
          '--x-drift': `${Math.random() * 200 - 100}px`
        } as ParticleStyle
      };
    });
  }, []);

  if (!isMounted) return null;

  return (
    <>
      <style>{`
        @keyframes float-up {
          0% {
            bottom: -150px;
            transform: translateX(0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: 0.8;
          }
          90% {
            opacity: 0.8;
          }
          100% {
            bottom: 100%;
            transform: translateX(var(--x-drift)) scale(1);
            opacity: 0;
          }
        }
        .particle {
          position: absolute;
          bottom: -150px;
          left: var(--left-start);
          animation: float-up var(--duration) linear var(--delay) infinite;
          user-select: none;
          pointer-events: none;
        }
      `}</style>

      <div
        className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none"
        style={{ zIndex }}
        aria-hidden="true"
      >
        {particles.map((p) => (
          <Image
            key={p.id}
            src={p.src}
            alt={p.alt}
            width={p.width}
            height={p.height}
            className="particle"
            style={p.style}
          />
        ))}
      </div>
    </>
  );
};

export default AnimatedParticles; */}
