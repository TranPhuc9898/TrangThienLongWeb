'use client';

import { useEffect } from 'react';

export function WebVitals() {
  useEffect(() => {
    import('web-vitals').then(({ onCLS, onINP, onFCP, onLCP, onTTFB }) => {
      const reportWebVitals = (metric: any) => {
        if (process.env.NODE_ENV === 'production') {
          console.log('Web Vital:', metric);
          
          // Send to Google Analytics
          if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', metric.name, {
              event_category: 'Web Vitals',
              value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
              event_label: metric.id,
              non_interaction: true,
            });
          }
        }
      };

      onCLS(reportWebVitals);
      onINP(reportWebVitals);
      onFCP(reportWebVitals);
      onLCP(reportWebVitals);
      onTTFB(reportWebVitals);
    });
  }, []);

  return null;
}