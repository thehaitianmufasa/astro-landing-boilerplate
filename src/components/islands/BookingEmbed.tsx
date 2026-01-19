import { useEffect, useRef, useState } from 'react';

interface BookingEmbedProps {
  calendarUrl: string;
  height?: number;
}

/**
 * Booking embed for Calendly, Cal.com, or similar services.
 * Uses client:visible for on-demand hydration.
 *
 * Usage in Astro:
 * <BookingEmbed client:visible calendarUrl="https://calendly.com/your-link" />
 */
export default function BookingEmbed({
  calendarUrl,
  height = 650,
}: BookingEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Detect calendar provider and load appropriate embed
    if (calendarUrl.includes('calendly.com')) {
      loadCalendly(calendarUrl);
    }
    // Add other providers as needed (Cal.com, etc.)
  }, [calendarUrl]);

  function loadCalendly(url: string) {
    if (!containerRef.current) return;

    // Clear container
    containerRef.current.textContent = '';

    // Create Calendly widget div using safe DOM methods
    const widgetDiv = document.createElement('div');
    widgetDiv.className = 'calendly-inline-widget';
    widgetDiv.setAttribute('data-url', `${url}?hide_landing_page_details=1&hide_gdpr_banner=1`);
    widgetDiv.style.minWidth = '320px';
    widgetDiv.style.height = `${height}px`;
    containerRef.current.appendChild(widgetDiv);

    // Dynamically load Calendly widget script
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    script.onload = () => setIsLoading(false);
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }

  return (
    <section id="booking" className="section">
      <div className="container-tight">
        <div className="text-center mb-8">
          <h2 className="mb-4">Book a Call</h2>
          <p className="text-text-muted">
            Choose a time that works for you
          </p>
        </div>

        <div
          ref={containerRef}
          className="card overflow-hidden"
          style={{ minHeight: height }}
        >
          {/* Placeholder while loading */}
          {isLoading && (
            <div className="flex items-center justify-center h-full text-text-muted">
              Loading calendar...
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
