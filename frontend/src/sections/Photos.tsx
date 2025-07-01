'use client';

import type React from 'react';
import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimationFrame } from 'framer-motion';

const imageFilenames = [
  'store-front.png',
  'store-entry.png',
  'store-side.png',
  'glasses-wall.png',
  'glasses-second-hand.png',
  'sunglasses.png',
  'lens-cleaner.png',
  'poster-sidewalk.png',
  'mascot-retine.png',
];

const images = imageFilenames.map((filename, i) => ({
  id: `photo-${i}`,
  src: `/photos/${filename}`,
}));

export default function Photos() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const x = useRef(0);

  const [isSlowed, setIsSlowed] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState<number | null>(null);
  const [zoomSrc, setZoomSrc] = useState<string | null>(null);
  const [hasDragged, setHasDragged] = useState(false);

  const normalSpeed = 0.2;
  const slowSpeed = 0.05;

  useAnimationFrame(() => {
    if (!trackRef.current || dragging) return;

    const totalWidth = trackRef.current.scrollWidth;

    if (-x.current >= totalWidth / 2) {
      x.current = 0;
      trackRef.current.style.transform = 'translateX(0px)';
      return;
    }

    const speed = isSlowed ? slowSpeed : normalSpeed;
    x.current -= speed;
    trackRef.current.style.transform = `translateX(${x.current}px)`;
  });

  useEffect(() => {
    const totalWidth = trackRef.current?.scrollWidth ?? 0;
    const interval = setInterval(() => {
      if (-x.current >= totalWidth / 2) x.current = 0;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    setHasDragged(false);
    setDragStartX(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!dragging || dragStartX === null || !trackRef.current) return;
    const deltaX = e.clientX - dragStartX;
    x.current += deltaX;
    trackRef.current.style.transform = `translateX(${x.current}px)`;
    setDragStartX(e.clientX);
    setHasDragged(true);
  };

  const handlePointerUp = () => {
    setDragging(false);
    setDragStartX(null);
  };

  const handleClick = (src: string) => {
    if (!hasDragged) setZoomSrc(src);
  };

  return (
    <div
      id="photos"
      className="relative w-screen overflow-hidden bg-primary py-4 shadow-xl"
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerUp}
    >
      <div
        ref={containerRef}
        className="relative mx-auto w-full touch-none overflow-hidden"
        style={{
          maskImage:
            'linear-gradient(to right, transparent 1%, black 5%, black 95%, transparent 99%)',
          WebkitMaskImage:
            'linear-gradient(to right, transparent 1%, black 5%, black 95%, transparent 99%)',
        }}
      >
        <div
          ref={trackRef}
          className="flex w-max gap-4 px-4"
          onMouseEnter={() => setIsSlowed(true)}
          onMouseLeave={() => setIsSlowed(false)}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          style={{ touchAction: 'pan-y', cursor: dragging ? 'grabbing' : 'grab' }}
        >
          {[...images, ...images].map(({ id, src }) => (
            <button
              type="button"
              key={id}
              className="flex-shrink-0 overflow-hidden rounded-xl bg-white shadow-md"
              tabIndex={0}
              onClick={() => handleClick(src)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleClick(src);
                }
              }}
            >
              <motion.img
                src={src}
                alt={`Gallery item ${id + 1}`}
                className="aspect-[9/16] h-[500px] w-auto object-cover transition-transform duration-300 ease-out hover:scale-105"
                draggable={false}
              />
            </button>
          ))}
        </div>
      </div>

      {/* Zoom modal */}
      <AnimatePresence>
        {zoomSrc && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomSrc(null)}
          >
            <motion.img
              src={zoomSrc}
              alt="Zoomed view of gallery item"
              className="max-h-[90vh] max-w-[90vw] rounded-xl shadow-2xl"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
