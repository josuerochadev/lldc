import type React from 'react';

type PictureProps = {
  srcBase: string;
  alt: string;
  priority?: boolean;
  className?: string;
  fallbackSrc?: string;
  /** Désactive les <source> AVIF/WebP pour forcer l'usage du fallback <img>. */
  disableSources?: boolean;
};

const Picture: React.FC<PictureProps> = ({
  srcBase,
  alt,
  priority = false,
  className,
  fallbackSrc,
  disableSources = false,
}) => {
  const widths = [480, 768, 1200, 1600] as const;
  const avifSrcSet = widths.map((w) => `${srcBase}-${w}.avif ${w}w`).join(', ');
  const webpSrcSet = widths.map((w) => `${srcBase}-${w}.webp ${w}w`).join(', ');

  const sizes =
    '(min-width: 1280px) 1200px, (min-width: 1024px) 1200px, (min-width: 768px) 768px, 100vw';

  const loading = (priority ? 'eager' : 'lazy') as 'eager' | 'lazy';
  const decoding = (priority ? 'sync' : 'async') as 'sync' | 'async';
  const fetchPriority = (priority ? 'high' : 'auto') as 'high' | 'auto';

  const fallback = fallbackSrc ?? `${srcBase}-768.webp`;

  return (
    <picture>
      {!disableSources && (
        <>
          <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
          <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
        </>
      )}
      <img
        src={fallback}
        alt={alt}
        loading={loading}
        decoding={decoding}
        fetchPriority={fetchPriority}
        className={className ?? 'h-full w-full object-cover'}
      />
    </picture>
  );
};

export default Picture;
