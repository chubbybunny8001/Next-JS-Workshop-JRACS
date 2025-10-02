import { Button } from '@repo/ui/components/button';
import { ArrowLeft, FileQuestion, Home } from 'lucide-react';
import Link from 'next/link';

export default function BlogPostNotFound() {
  return (
    <main className="flex min-h-[calc(100vh-200px)] flex-col items-center justify-center px-4 py-16">
      <div className="mx-auto max-w-md text-center">
        <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-muted">
          <FileQuestion className="h-8 w-8 text-muted-foreground" />
        </div>

        <h1 className="mb-3 font-bold text-3xl tracking-tight">
          Blog Post Not Found
        </h1>

        <p className="mb-8 text-pretty text-muted-foreground leading-relaxed">
          The blog post you're looking for doesn't exist or may have been
          removed. Please check the URL or browse our other articles.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="gap-2" size="lg">
            <Link href="/">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <Button
            asChild
            className="gap-2 bg-transparent"
            size="lg"
            variant="outline"
          >
            <Link href={`http://${process.env.NEXT_PUBLIC_WEB_BASE_URL}`}>
              <Home className="h-4 w-4" />
              Go Home
            </Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
