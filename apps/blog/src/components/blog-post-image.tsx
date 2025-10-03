'use client';

import Image from 'next/image';
import { useState } from 'react';

interface BlogPostImageProps {
  src: string;
  alt: string;
}

export function BlogPostImage({ src, alt }: BlogPostImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative aspect-video overflow-hidden rounded-lg">
      {/* Blurred background placeholder */}
      <div
        className={`absolute inset-0 bg-muted/50 backdrop-blur-xl transition-opacity duration-500 ${
          isLoaded ? 'opacity-0' : 'opacity-100'
        }`}
      />

      {/* Actual image with fade-in */}
      <Image
        alt={alt}
        className={`h-full w-full object-cover transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        fetchPriority="high"
        height={450}
        onLoad={() => setIsLoaded(true)}
        quality={90}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        src={src || '/placeholder.svg'}
        width={800}
      />
    </div>
  );
}
