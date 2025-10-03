// API Methods
import {
  fetchClients,
  fetchCompanyStats,
  fetchServices,
  fetchTestimonials,
} from '@repo/api/brand';

// Components
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import { Button } from '@repo/ui/components/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import {
  ArrowRight,
  Award,
  Globe,
  Star,
  TrendingUp,
  Users,
} from 'lucide-react';

// Next.js
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Innovative Solutions for Modern Business | Company Name',
  description:
    'We deliver exceptional services that drive growth, innovation, and success for companies worldwide. Trusted by industry leaders with 15+ years of experience.',
  keywords: [
    'business solutions',
    'innovation',
    'consulting',
    'digital transformation',
    'enterprise services',
  ],
  openGraph: {
    title: 'Innovative Solutions for Modern Business',
    description:
      'We deliver exceptional services that drive growth, innovation, and success for companies worldwide.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Innovative Solutions for Modern Business',
    description:
      'We deliver exceptional services that drive growth, innovation, and success for companies worldwide.',
  },
};

export default async function HomePage() {
  const [services, testimonials, stats, clients] = await Promise.all([
    fetchServices(6),
    fetchTestimonials(3, true),
    fetchCompanyStats(),
    fetchClients(8, true),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden border-border border-b">
        <div className="container mx-auto px-4 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-6xl lg:text-7xl">
              Innovative Solutions for Modern Business
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground leading-relaxed md:text-xl">
              We deliver exceptional services that drive growth, innovation, and
              success for companies worldwide.
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button asChild size="lg">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-border border-b bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3 lg:grid-cols-6">
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4 font-bold text-3xl">
                {stats.employeeCount}+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Team Members
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Award className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4 font-bold text-3xl">
                {stats.projectsCompleted}+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Projects Completed
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <TrendingUp className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4 font-bold text-3xl">
                {stats.yearsInBusiness}+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Years in Business
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Users className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4 font-bold text-3xl">
                {stats.clientCount}+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Happy Clients
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Globe className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4 font-bold text-3xl">
                {stats.countriesServed}+
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Countries Served
              </div>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center">
                <Star className="h-8 w-8 text-accent" />
              </div>
              <div className="mt-4 font-bold text-3xl">
                {stats.satisfactionRate}%
              </div>
              <div className="mt-1 text-muted-foreground text-sm">
                Satisfaction Rate
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Our Services
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Comprehensive solutions tailored to your business needs
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Card
                className="relative overflow-hidden transition-shadow hover:shadow-lg"
                key={service.id}
              >
                {service.popular && (
                  <Badge className="absolute top-4 right-4 bg-accent-foreground text-accent">
                    Popular
                  </Badge>
                )}
                <CardHeader>
                  <div className="mb-2 text-4xl">{service.icon}</div>
                  <CardTitle>{service.name}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    {service.features.slice(0, 3).map((feature) => (
                      <li className="flex items-start gap-2" key={feature}>
                        <span className="mt-1 text-accent">•</span>
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  {service.price && (
                    <div className="mt-4 border-border border-t pt-4">
                      <div className="font-bold text-2xl">
                        ${service.price.amount}
                        <span className="font-normal text-muted-foreground text-sm">
                          /{service.price.period}
                        </span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="border-border border-y bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              What Our Clients Say
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Trusted by businesses worldwide
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id}>
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Avatar>
                      <AvatarImage
                        alt={testimonial.author.name}
                        src={testimonial.author.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {testimonial.author.name
                          .split(' ')
                          .map((n) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-base">
                        {testimonial.author.name}
                      </CardTitle>
                      <CardDescription className="text-sm">
                        {testimonial.author.role} at{' '}
                        {testimonial.author.company}
                      </CardDescription>
                    </div>
                  </div>
                  <div className="mt-2 flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        className={`h-4 w-4 ${
                          i < Math.floor(testimonial.rating)
                            ? 'fill-accent text-accent'
                            : 'text-muted'
                        }`}
                        key={`${testimonial.id}-${i}`}
                      />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="line-clamp-4 text-muted-foreground text-sm leading-relaxed">
                    {testimonial.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Trusted By
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Partnering with industry leaders
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4">
            {clients.map((client) => (
              <div
                className="flex items-center justify-center rounded-lg border border-border bg-card p-6 transition-shadow hover:shadow-md"
                key={client.id}
              >
                <Image
                  alt={client.name}
                  className="h-12 w-auto object-contain opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
                  height={48}
                  src={client.logo}
                  width={150}
                  quality={85}
                  sizes='( max-width: 768px ) 50vw, ( max-width: 1200px ) 25vw, 20vw'
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="border-border border-t bg-primary py-24 text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-balance font-bold text-3xl tracking-tight md:text-4xl">
            Ready to Transform Your Business?
          </h2>
          <p className="mt-4 text-pretty text-lg opacity-90">
            Let's discuss how we can help you achieve your goals
          </p>
          <div className="mt-10">
            <Button asChild size="lg" variant="secondary">
              <Link href="/contact">
                Contact Us Today <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
