// API Methods
/** biome-ignore-all assist/source/organizeImports: I link to have my imports ordered */
import {
  fetchCompanyStats,
  fetchContactInfo,
  fetchTeamMembers,
} from '@repo/api/brand';

// Components
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@repo/ui/components/avatar';
import { Badge } from '@repo/ui/components/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';

// Next.js
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us - Our Mission, Values & Team | Company Name',
  description:
    'Learn about our mission to provide world-class services, our core values, and meet the talented team of professionals driving innovation and excellence.',
  keywords: [
    'about us',
    'company mission',
    'team',
    'values',
    'innovation',
    'excellence',
  ],
  openGraph: {
    title: 'About Us - Our Mission, Values & Team',
    description:
      'Learn about our mission to provide world-class services, our core values, and meet the talented team of professionals driving innovation and excellence.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us - Our Mission, Values & Team',
    description:
      'Learn about our mission to provide world-class services, our core values, and meet the talented team of professionals driving innovation and excellence.',
  },
};

interface TeamMember {
  id: string;
  name: string;
  avatar?: string;
  department: string;
  role: string;
  bio: string;
  skills: string[];
  email: string;
  linkedin?: string;
  twitter?: string;
  github?: string;
}

export default async function AboutPage() {
  const [teamMembers, stats, contactInfo] = await Promise.all([
    fetchTeamMembers(12),
    fetchCompanyStats(),
    fetchContactInfo(),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="border-border border-b py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              About Our Company
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground leading-relaxed">
              We are a team of passionate professionals dedicated to delivering
              innovative solutions that empower businesses to thrive in the
              digital age.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
            <div>
              <h2 className="font-bold text-3xl tracking-tight">Our Mission</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                To provide world-class services that help businesses transform
                their operations, enhance customer experiences, and achieve
                sustainable growth through innovative technology solutions.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                We believe in building long-term partnerships with our clients,
                understanding their unique challenges, and delivering tailored
                solutions that drive real results.
              </p>
            </div>
            <div>
              <h2 className="font-bold text-3xl tracking-tight">Our Values</h2>
              <ul className="mt-4 space-y-3">
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent">•</span>
                  <div>
                    <strong className="text-foreground">Innovation:</strong>
                    <span className="text-muted-foreground">
                      {' '}
                      Constantly pushing boundaries and exploring new
                      possibilities
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent">•</span>
                  <div>
                    <strong className="text-foreground">Excellence:</strong>
                    <span className="text-muted-foreground">
                      {' '}
                      Delivering the highest quality in everything we do
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent">•</span>
                  <div>
                    <strong className="text-foreground">Integrity:</strong>
                    <span className="text-muted-foreground">
                      {' '}
                      Building trust through transparency and honesty
                    </span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-1 text-accent">•</span>
                  <div>
                    <strong className="text-foreground">Collaboration:</strong>
                    <span className="text-muted-foreground">
                      {' '}
                      Working together to achieve shared success
                    </span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-border border-y bg-muted/30 py-16">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="font-bold text-4xl text-accent">
                {stats.employeeCount}+
              </div>
              <div className="mt-2 text-muted-foreground text-sm">
                Expert Team Members
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-accent">
                {stats.yearsInBusiness}+
              </div>
              <div className="mt-2 text-muted-foreground text-sm">
                Years of Experience
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-4xl text-accent">
                {stats.countriesServed}+
              </div>
              <div className="mt-2 text-muted-foreground text-sm">
                Countries Worldwide
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="mb-16 text-center">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Meet Our Team
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              Talented professionals driving innovation and excellence
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {teamMembers.map((member: TeamMember) => (
              <Card
                className="overflow-hidden transition-shadow hover:shadow-lg"
                key={member.id}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        alt={member.name}
                        src={member.avatar || '/placeholder.svg'}
                      />
                      <AvatarFallback>
                        {member.name
                          .split(' ')
                          .map((n: string) => n[0])
                          .join('')}
                      </AvatarFallback>
                    </Avatar>
                    <Badge className="text-xs" variant="secondary">
                      {member.department}
                    </Badge>
                  </div>
                  <div className="mt-4">
                    <CardTitle className="text-lg">{member.name}</CardTitle>
                    <CardDescription>{member.role}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="mb-4 line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                    {member.bio}
                  </p>
                  <div className="mb-4 flex flex-wrap gap-1">
                    {member.skills.slice(0, 3).map((skill: string) => (
                      <Badge className="text-xs" key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex gap-3 text-muted-foreground">
                    <a
                      className="transition-colors hover:text-accent"
                      href={`mailto:${member.email}`}
                    >
                      <Mail className="h-4 w-4" />
                    </a>
                    {member.linkedin && (
                      <a
                        className="transition-colors hover:text-accent"
                        href={member.linkedin}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    )}
                    {member.twitter && (
                      <a
                        className="transition-colors hover:text-accent"
                        href={member.twitter}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Twitter className="h-4 w-4" />
                      </a>
                    )}
                    {member.github && (
                      <a
                        className="transition-colors hover:text-accent"
                        href={member.github}
                        rel="noopener noreferrer"
                        target="_blank"
                      >
                        <Github className="h-4 w-4" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="border-border border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
              Get In Touch
            </h2>
            <p className="mt-4 text-pretty text-lg text-muted-foreground">
              We'd love to hear from you
            </p>
            <div className="mt-12 grid gap-8 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Office Location</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground text-sm">
                  <p>{contactInfo.address.street}</p>
                  <p>
                    {contactInfo.address.city}, {contactInfo.address.state}{' '}
                    {contactInfo.address.zipCode}
                  </p>
                  <p>{contactInfo.address.country}</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Contact Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-muted-foreground text-sm">
                  <p>Email: {contactInfo.email}</p>
                  <p>Phone: {contactInfo.phone}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
