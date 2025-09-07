// Performance utilities for Core Web Vitals optimization

// Preload critical resources
export const preloadCriticalResources = () => {
  if (typeof window !== 'undefined') {
    // Preload critical images
    const criticalImages = [
      '/images/iphone13.png',
      '/images/banner/backtoschool-02.png',
      '/images/ttl.png'
    ];
    
    criticalImages.forEach(src => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = src;
      link.as = 'image';
      link.fetchPriority = 'high';
      document.head.appendChild(link);
    });

    // Preload critical fonts
    const fonts = [
      '/fonts/satoshi/Satoshi-Variable.woff2',
      '/fonts/integral-cf/IntegralCF-Regular.woff2'
    ];
    
    fonts.forEach(href => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.href = href;
      link.as = 'font';
      link.type = 'font/woff2';
      link.crossOrigin = 'anonymous';
      document.head.appendChild(link);
    });
  }
};

// Optimize layout shift
export const preventLayoutShift = () => {
  const style = document.createElement('style');
  style.textContent = `
    /* Prevent layout shift for images */
    img[loading="lazy"] {
      aspect-ratio: var(--aspect-ratio, auto);
    }
    
    /* Prevent layout shift for videos */
    video {
      background-color: #f0f0f0;
    }
    
    /* Optimize Swiper for CLS */
    .swiper-slide {
      flex-shrink: 0;
    }
  `;
  document.head.appendChild(style);
};

// Web Vitals monitoring
export const reportWebVitals = (metric: any) => {
  if (process.env.NODE_ENV === 'production') {
    console.log('Web Vital:', metric);
    
    // Send to analytics service
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

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  if (typeof window !== 'undefined') {
    // Preload critical resources
    preloadCriticalResources();
    
    // Prevent layout shift
    preventLayoutShift();
    
    // Optimize scrolling
    if ('scrollBehavior' in document.documentElement.style) {
      document.documentElement.style.scrollBehavior = 'smooth';
    }
  }
};