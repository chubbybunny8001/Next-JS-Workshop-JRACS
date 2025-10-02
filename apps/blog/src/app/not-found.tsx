import { Button } from '@repo/ui/components/button';
import { FileQuestion } from 'lucide-react';
import Link from 'next/link';

export default function BlogNotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 items-center justify-center px-4 py-16">
        <div className="mx-auto max-w-md text-center">
          <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-8 w-8 text-muted-foreground" />
          </div>

          <h1 className="mb-3 font-bold text-3xl tracking-tight">
            Page Not Found
          </h1>

          <p className="mb-8 text-pretty text-muted-foreground leading-relaxed">
            The blog page you're looking for doesn't exist. It may have been
            moved or deleted.
          </p>

          <Button asChild size="lg">
            <Link href="/">Go Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
