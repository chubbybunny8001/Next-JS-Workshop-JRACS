'use client';

import { GalleryItemCard } from '@components/gallery-item-card';
import type { GalleryItem } from '@repo/api/brand';
import { useQueryState } from 'nuqs';
import { useMemo } from 'react';

interface GalleryGridProps {
  items: GalleryItem[];
}

export function GalleryGrid({ items }: GalleryGridProps) {
  const [selectedCategory] = useQueryState('category', {
    defaultValue: 'All',
    shallow: false,
  });

  const filteredItems = useMemo(() => {
    return selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);
  }, [items, selectedCategory]);

  return (
    <section className="py-16">
      <div className="container mx-auto px-4">
        <div className="mb-8 text-center text-muted-foreground text-sm">
          Showing {filteredItems.length}{' '}
          {filteredItems.length === 1 ? 'item' : 'items'}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredItems.map((item, index) => (
            <GalleryItemCard
              index={index}
              item={item}
              key={`${selectedCategory}-${item.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
