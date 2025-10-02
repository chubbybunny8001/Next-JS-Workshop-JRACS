'use client';

import { Button } from '@repo/ui/components/button';
import { Input } from '@repo/ui/components/input';
import { Label } from '@repo/ui/components/label';
import { toast } from '@repo/ui/components/sonner';
import { Textarea } from '@repo/ui/components/textarea';
import { Loader2 } from 'lucide-react';
import { useActionState, useEffect, useRef } from 'react';
import { submitForm } from '../app/form-actions/actions';

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(submitForm, {
    message: '',
  });

  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    if (state?.success) {
      toast.success('Success!', {
        description: state.message,
      });
      formRef.current?.reset();
    } else if (state?.error) {
      toast.error('Error', {
        description: state.error,
      });
    }
  }, [state]);

  return (
    <form
      action={formAction}
      className="space-y-6"
      ref={formRef}
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input id="name" name="name" placeholder="John Doe" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            placeholder="john@example.com"
            required
            type="email"
          />
        </div>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            name="phone"
            placeholder="+1 (555) 000-0000"
            type="tel"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject *</Label>
          <Input
            id="subject"
            name="subject"
            placeholder="How can we help?"
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="message">Message *</Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Tell us more about your inquiry..."
          required
          rows={6}
        />
      </div>
      <Button
        className="w-full md:w-auto"
        disabled={isPending}
        size="lg"
        type="submit"
      >
        {isPending ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Sending...
          </>
        ) : (
          'Send Message'
        )}
      </Button>{' '}
    </form>
  );
}
