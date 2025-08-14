// components/AnimatedParticles.tsx
'use client';

import React, { useState, useEffect, useMemo } from "react";
import Image from 'next/image';

// Define types for better TypeScript support
type SizeType = 'small' | 'medium' | 'large';
type SpeedType = 'slow' | 'medium' | 'fast';
type DensityType = 'low' | 'medium' | 'high';

interface ParticleStyle extends React.CSSProperties {
  '--left-start': string;
  '--left-end': string;
  '--delay': string;
  '--duration': string;
  '--opacity': number;
}

interface Particle {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
  style: ParticleStyle;
}

interface AnimatedParticlesProps {
  particleCount?: number;
  zIndex?: number;
  opacity?: number;
  className?: string;
  enableStars?: boolean;
  enableBubbles?: boolean;
  size?: SizeType;
  speed?: SpeedType;
  density?: DensityType;
}

const AnimatedParticles: React.FC<AnimatedParticlesProps> = ({ 
  particleCount = 25,
  zIndex = -10, // FIX: Changed to negative z-index to stay behind content
  opacity = 0.8,
  className = "",
  enableStars = true,
  enableBubbles = true,
  size = "medium",
  speed = "medium",
  density = "medium"
}) => {
  const [isMounted, setIsMounted] = useState(false);
  
  useEffect(() => { 
    setIsMounted(true); 
  }, []);

  const particles = useMemo(() => {
    const starImages = [
      '/images/stars-01.png', 
      '/images/stars-02.png', 
      '/images/stars-03.png', 
      '/images/stars-04.png', 
      '/images/stars-05.png'
    ];
    
    const bubbleImages = [
      '/images/bubbles-01.png', 
      '/images/bubbles-02.png', 
      '/images/bubbles-03.png', 
      '/images/bubbles-04.png', 
      '/images/bubbles-05.png', 
      '/images/bubbles-06.png', 
      '/images/bubbles-07.png', 
      '/images/bubbles-08.png', 
      '/images/bubbles-09.png', 
      '/images/bubbles-10.png', 
      '/images/bubbles-11.png'
    ];

    // Adjust particle count based on density
    const densityMultiplier: Record<DensityType, number> = {
      low: 0.6,
      medium: 1,
      high: 1.4
    };
    const finalCount = Math.round(particleCount * densityMultiplier[density]);

    // Size configurations with proper typing
    const sizeConfig: Record<SizeType, { star: [number, number]; bubble: [number, number] }> = {
      small: { star: [15, 30], bubble: [25, 50] },
      medium: { star: [20, 40], bubble: [40, 80] },
      large: { star: [30, 50], bubble: [60, 100] }
    };

    // Speed configurations (duration range) with proper typing
    const speedConfig: Record<SpeedType, [number, number]> = {
      slow: [25, 45],
      medium: [15, 35],
      fast: [8, 20]
    };

    return Array.from({ length: finalCount }).map((_, i): Particle => {
      let isStar: boolean;
      let imageArray: string[];
      
      if (enableStars && enableBubbles) {
        isStar = Math.random() > 0.6;
        imageArray = isStar ? starImages : bubbleImages;
      } else if (enableStars) {
        isStar = true;
        imageArray = starImages;
      } else {
        isStar = false;
        imageArray = bubbleImages;
      }
      
      const src = imageArray[Math.floor(Math.random() * imageArray.length)];
      const sizeRange = sizeConfig[size][isStar ? 'star' : 'bubble'];
      const particleSize = Math.floor(Math.random() * (sizeRange[1] - sizeRange[0]) + sizeRange[0]);
      
      const speedRange = speedConfig[speed];
      const duration = Math.random() * (speedRange[1] - speedRange[0]) + speedRange[0];
      
      return {
        id: i,
        src,
        alt: isStar ? 'star' : 'bubble',
        width: particleSize,
        height: particleSize,
        style: {
          '--left-start': `${Math.random() * 100}%`,
          '--left-end': `${Math.random() * 100}%`,
          '--delay': `${Math.random() * 20}s`,
          '--duration': `${duration}s`,
          '--opacity': opacity
        }
      };
    });
  }, [particleCount, opacity, enableStars, enableBubbles, size, speed, density]);

  if (!isMounted) { 
    return null; 
  }

  return (
    <>
      <style jsx>{`
        @keyframes float-up {
          0% {
            transform: translateX(0) scale(0.5);
            opacity: 0;
          }
          10% {
            opacity: var(--opacity);
          }
          90% {
            opacity: var(--opacity);
          }
          100% {
            bottom: 100%;
            transform: translateX(calc(var(--left-end) - var(--left-start))) scale(1);
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
        .particles-container {
          pointer-events: none !important;
        }
      `}</style>
      
      <div 
        className={`fixed top-0 left-0 w-full h-full overflow-hidden particles-container ${className}`}
        style={{ 
          zIndex,
          pointerEvents: 'none' // FIX: Ensure container doesn't block interactions
        }}
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
            style={{
              ...p.style,
              pointerEvents: 'none' // FIX: Explicitly disable pointer events on each particle
            }}
            loading="lazy"
          />
        ))}
      </div>
    </>
  );
};

export default AnimatedParticles;