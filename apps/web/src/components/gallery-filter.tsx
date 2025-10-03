'use client';

import { Button } from '@repo/ui/components/button';
import { useQueryState } from 'nuqs';

interface GalleryFilterProps {
  categories: string[];
}

export function GalleryFilter({ categories }: GalleryFilterProps) {
  const [selectedCategory, setSelectedCategory] = useQueryState('category', {
    defaultValue: 'All',
    shallow: false,
  });

  return (
    <section className="border-border border-b bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center gap-2">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              size="sm"
              variant={selectedCategory === category ? 'default' : 'outline'}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
