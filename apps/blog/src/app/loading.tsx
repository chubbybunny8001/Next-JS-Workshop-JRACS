import { BlogPostsSkeleton } from '@components/blog-posts-skeleton';

export default function BlogLoading() {
  return (
    <main>
      {/* Hero Section */}
      <section className="border-border border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Our Blog
            </h1>
            <p className="mt-4 text-pretty text-lg text-muted-foreground leading-relaxed">
              Insights, tutorials, and stories from our team
            </p>
          </div>
        </div>
      </section>
      <BlogPostsSkeleton />
    </main>
  );
}
