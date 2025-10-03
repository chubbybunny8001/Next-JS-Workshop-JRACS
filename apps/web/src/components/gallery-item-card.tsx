'use client';

// API Methods
import type { GalleryItem } from '@repo/api/brand';

// Components
import { Badge } from '@repo/ui/components/badge';

// Next.js
import Image from 'next/image';
import { useState } from 'react';

interface GalleryItemCardProps {
  item: GalleryItem;
  index: number;
}

export function GalleryItemCard({ item, index }: GalleryItemCardProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="group fade-in slide-in-from-left-4 relative animate-in overflow-hidden rounded-lg border border-border bg-card fill-mode-both transition-all hover:shadow-lg"
      style={{
        animationDelay: `${index * 0.05}s`,
        animationDuration: '0.5s',
      }}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-muted">
        {/* Blurred placeholder background */}
        <div
          className={`absolute inset-0 bg-gradient-to-br from-muted via-muted/80 to-muted/60 backdrop-blur-xl transition-opacity duration-700 ${
            isLoaded ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Actual image with fade-in */}
        <Image
          alt={item.title}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          fill
          onLoad={() => setIsLoaded(true)}
          quality={85}
          sizes="( max-width: 768px ) 100vw, ( max-width: 1200px ) 25vw, 20vw"
          src={item.thumbnailUrl || '/placeholder.svg'}
        />
      </div>
      <div className="p-4">
        <div className="mb-2 flex items-start justify-between gap-2">
          <h3 className="line-clamp-1 font-semibold text-sm">{item.title}</h3>
          {item.featured && (
            <Badge className="shrink-0 text-xs" variant="secondary">
              Featured
            </Badge>
          )}
        </div>
        <p className="mb-3 line-clamp-2 text-muted-foreground text-xs">
          {item.description}
        </p>
        <div className="flex flex-wrap gap-1">
          <Badge className="text-xs" variant="outline">
            {item.category}
          </Badge>
          {item.tags.slice(0, 2).map((tag) => (
            <Badge className="text-xs" key={tag} variant="outline">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
