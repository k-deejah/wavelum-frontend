import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 0.2, // 20% of transactions for performance monitoring

  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions for replay
  replaysOnErrorSampleRate: 1.0, // 100% of error sessions for replay

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || 'development',

  // Integrations
  integrations: [
    Sentry.replayIntegration({
      maskAllText: true,
      blockAllMedia: true,
    }),
  ],

  // Filter out known non-actionable errors
  beforeSend(event, hint) {
    // Ignore errors from browser extensions
    if (event.exception) {
      const error = hint.originalException as Error;
      if (error && error.message) {
        const ignorePatterns = [
          /chrome-extension:/i,
          /safari-extension:/i,
          /moz-extension:/i,
          /Non-error script loaded/i,
          /Failed to fetch/i,
          /NetworkError/i,
          /Loading chunk/i,
          /ResizeObserver loop limit exceeded/i,
          /Passive event listener violation/i,
        ];

        for (const pattern of ignorePatterns) {
          if (pattern.test(error.message)) {
            return null;
          }
        }
      }
    }

    // Add user context from wallet connection if available
    if (typeof window !== 'undefined') {
      const walletAddress = (window as Window & { __walletAddress?: string }).__walletAddress;
      if (walletAddress) {
        event.user = {
          ...event.user,
          id: walletAddress,
        };
      }
    }

    return event;
  },

  // Breadcrumb configuration
  beforeBreadcrumb(breadcrumb) {
    // Filter out noisy breadcrumbs
    if (breadcrumb.category === 'ui.click' && breadcrumb.data?.selector === '[data-sentry-ignore]') {
      return null;
    }
    return breadcrumb;
  },
});

// Export for use in instrumentation
export { Sentry };