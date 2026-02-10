import { useState } from 'react';

interface CatalogCardImageProps {
  src: string;
  alt: string;
}

export default function CatalogCardImage({ src, alt }: CatalogCardImageProps) {
  const [imageError, setImageError] = useState(false);

  // If no valid image path or image failed to load, show fallback
  if (!src || imageError || src.endsWith('.jpg') && !src.startsWith('/assets')) {
    return (
      <div className="w-full h-full bg-muted flex items-center justify-center">
        <div className="text-center p-6">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
            <span className="text-2xl">👔</span>
          </div>
          <p className="text-sm text-muted-foreground">Image coming soon</p>
        </div>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover"
      onError={() => setImageError(true)}
      loading="lazy"
    />
  );
}
