// ==========================================================================
// BIZMARK.ID - Analytics & Performance Utilities
// ==========================================================================

// Performance monitoring
export class PerformanceMonitor {
  constructor() {
    this.metrics = {
      pageLoadTime: 0,
      firstContentfulPaint: 0,
      largestContentfulPaint: 0,
      interactionToNextPaint: 0
    };
    this.init();
  }
  
  init() {
    // Monitor page load time
    window.addEventListener('load', () => {
      const navigation = performance.getEntriesByType('navigation')[0];
      this.metrics.pageLoadTime = navigation.loadEventEnd - navigation.loadEventStart;
      console.log('Page Load Time:', this.metrics.pageLoadTime, 'ms');
    });
    
    // Monitor FCP and LCP
    if ('PerformanceObserver' in window) {
      // First Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.name === 'first-contentful-paint') {
            this.metrics.firstContentfulPaint = entry.startTime;
            console.log('First Contentful Paint:', entry.startTime, 'ms');
          }
        }
      }).observe({ entryTypes: ['paint'] });
      
      // Largest Contentful Paint
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          this.metrics.largestContentfulPaint = entry.startTime;
          console.log('Largest Contentful Paint:', entry.startTime, 'ms');
        }
      }).observe({ entryTypes: ['largest-contentful-paint'] });
    }
  }
  
  // Track user interactions
  trackInteraction(action, element) {
    const timestamp = Date.now();
    console.log('User Interaction:', {
      action,
      element: element.tagName,
      timestamp,
      page: window.location.pathname
    });
  }
  
  // Report performance metrics
  getMetrics() {
    return this.metrics;
  }
}

// Simple analytics for user behavior
export class SimpleAnalytics {
  constructor() {
    this.events = [];
    this.session = {
      startTime: Date.now(),
      pageViews: 1,
      interactions: 0
    };
    this.init();
  }
  
  init() {
    // Track page visibility
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.trackEvent('page_hidden', { timestamp: Date.now() });
      } else {
        this.trackEvent('page_visible', { timestamp: Date.now() });
      }
    });
    
    // Track scroll depth
    this.trackScrollDepth();
    
    // Track time on page
    window.addEventListener('beforeunload', () => {
      const timeOnPage = Date.now() - this.session.startTime;
      this.trackEvent('session_end', { 
        duration: timeOnPage,
        interactions: this.session.interactions,
        pageViews: this.session.pageViews
      });
    });
  }
  
  trackEvent(eventName, data = {}) {
    const event = {
      name: eventName,
      timestamp: Date.now(),
      page: window.location.pathname,
      data
    };
    
    this.events.push(event);
    console.log('Analytics Event:', event);
  }
  
  trackScrollDepth() {
    let maxScroll = 0;
    const throttledScroll = this.throttle(() => {
      const scrollPercent = Math.round(
        (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100
      );
      
      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;
        
        // Track milestone scrolls
        if ([25, 50, 75, 100].includes(scrollPercent)) {
          this.trackEvent('scroll_depth', { percent: scrollPercent });
        }
      }
    }, 1000);
    
    window.addEventListener('scroll', throttledScroll);
  }
  
  // Utility function for throttling
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
  
  // Get analytics data
  getEvents() {
    return this.events;
  }
  
  getSession() {
    return this.session;
  }
}

// Contact form analytics
export function trackContactInteraction(type, data = {}) {
  const analytics = window.bizmarkAnalytics;
  if (analytics) {
    analytics.trackEvent('contact_interaction', {
      type,
      ...data
    });
  }
}

// Service interest tracking
export function trackServiceInterest(serviceName) {
  const analytics = window.bizmarkAnalytics;
  if (analytics) {
    analytics.trackEvent('service_interest', {
      service: serviceName,
      timestamp: Date.now()
    });
  }
}
