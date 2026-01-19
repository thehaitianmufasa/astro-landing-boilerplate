import { useState, type FormEvent } from 'react';

interface ContactFormProps {
  heading?: string;
  subheading?: string;
  submitEndpoint?: string;
}

export default function ContactForm({
  heading = 'Get In Touch',
  subheading = 'Fill out the form below and we\'ll get back to you shortly.',
  submitEndpoint,
}: ContactFormProps) {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData);

    try {
      if (submitEndpoint) {
        const response = await fetch(submitEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data),
        });

        if (!response.ok) {
          throw new Error('Failed to submit form');
        }
      } else {
        // Demo mode: simulate submission
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log('Form data:', data);
      }

      setStatus('success');
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      setStatus('error');
      setErrorMessage(error instanceof Error ? error.message : 'Something went wrong');
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container-tight">
        <div className="max-w-xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="mb-4">{heading}</h2>
            <p className="text-text-muted">{subheading}</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-4 py-3 bg-surface border border-secondary-light/30 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                           transition-all"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-4 py-3 bg-surface border border-secondary-light/30 rounded-lg
                           focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                           transition-all"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="subject" className="block text-sm font-medium mb-2">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                required
                className="w-full px-4 py-3 bg-surface border border-secondary-light/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                         transition-all"
                placeholder="How can we help?"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="w-full px-4 py-3 bg-surface border border-secondary-light/30 rounded-lg
                         focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent
                         transition-all resize-none"
                placeholder="Tell us more about your project..."
              />
            </div>

            {/* Status messages */}
            {status === 'success' && (
              <div className="p-4 bg-green-500/20 border border-green-500/30 rounded-lg text-green-400">
                Message sent successfully! We'll be in touch soon.
              </div>
            )}

            {status === 'error' && (
              <div className="p-4 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400">
                {errorMessage || 'Something went wrong. Please try again.'}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
