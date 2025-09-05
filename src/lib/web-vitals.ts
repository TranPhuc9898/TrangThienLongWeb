import { onCLS, onINP, onFCP, onLCP, onTTFB } from 'web-vitals';

export function initWebVitals() {
  if (typeof window !== 'undefined') {
    onCLS((metric) => {
      console.log('CLS:', metric);
    });

    onINP((metric) => {
      console.log('INP:', metric);
    });

    onFCP((metric) => {
      console.log('FCP:', metric);
    });

    onLCP((metric) => {
      console.log('LCP:', metric);
    });

    onTTFB((metric) => {
      console.log('TTFB:', metric);
    });
  }
}