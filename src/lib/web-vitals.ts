import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals';

export function initWebVitals() {
  if (typeof window !== 'undefined') {
    getCLS((metric) => {
      console.log('CLS:', metric);
    });

    getFID((metric) => {
      console.log('FID:', metric);
    });

    getFCP((metric) => {
      console.log('FCP:', metric);
    });

    getLCP((metric) => {
      console.log('LCP:', metric);
    });

    getTTFB((metric) => {
      console.log('TTFB:', metric);
    });
  }
}