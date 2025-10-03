import { ContactForm } from '@components/contact-form';
import { fetchContactInfo, fetchFAQs } from '@repo/api/brand';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@repo/ui/components/accordion';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card';
import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact Us - Get In Touch | Company Name',
  description:
    'Have a question or want to work together? Get in touch with our team. Find our contact information, business hours, and frequently asked questions.',
  keywords: [
    'contact',
    'get in touch',
    'support',
    'inquiries',
    'business hours',
    'FAQ',
  ],
  openGraph: {
    title: 'Contact Us - Get In Touch',
    description:
      'Have a question or want to work together? Get in touch with our team. Find our contact information, business hours, and frequently asked questions.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact Us - Get In Touch',
    description:
      'Have a question or want to work together? Get in touch with our team. Find our contact information, business hours, and frequently asked questions.',
  },
};

export default async function ContactPage() {
  const [contactInfo, faqs] = await Promise.all([
    fetchContactInfo(),
    fetchFAQs(8),
  ]);

  return (
    <main>
      {/* Hero Section */}
      <section className="border-border border-b py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-balance font-bold text-4xl tracking-tight md:text-5xl lg:text-6xl">
              Get In Touch
            </h1>
            <p className="mt-6 text-pretty text-lg text-muted-foreground leading-relaxed">
              Have a question or want to work together? We'd love to hear from
              you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form & Info Section */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="mb-6 font-bold text-2xl tracking-tight">
                Send Us a Message
              </h2>
              <ContactForm />
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="mb-6 font-bold text-2xl tracking-tight">
                Contact Information
              </h2>
              <div className="space-y-6">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Email</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      className="text-muted-foreground transition-colors hover:text-accent"
                      href={`mailto:${contactInfo.email}`}
                    >
                      {contactInfo.email}
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Phone className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Phone</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <a
                      className="text-muted-foreground transition-colors hover:text-accent"
                      href={`tel:${contactInfo.phone}`}
                    >
                      {contactInfo.phone}
                    </a>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Address</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">
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
                    <div className="flex items-center gap-3">
                      <Clock className="h-5 w-5 text-accent" />
                      <CardTitle className="text-lg">Business Hours</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-1 text-muted-foreground text-sm">
                    {Object.entries(contactInfo.businessHours).map(
                      ([day, hours]) => (
                        <div className="flex justify-between" key={day}>
                          <span className="capitalize">{day}:</span>
                          <span>
                            {hours === 'closed'
                              ? 'Closed'
                              : `${hours.open} - ${hours.close}`}
                          </span>
                        </div>
                      )
                    )}
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-border border-t bg-muted/30 py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl">
            <div className="mb-12 text-center">
              <h2 className="font-bold text-3xl tracking-tight md:text-4xl">
                Frequently Asked Questions
              </h2>
              <p className="mt-4 text-pretty text-lg text-muted-foreground">
                Find answers to common questions
              </p>
            </div>
            <Accordion className="w-full" collapsible type="single">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>
    </main>
  );
}
