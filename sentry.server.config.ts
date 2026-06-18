import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Performance Monitoring
  tracesSampleRate: 0.1, // Lower rate for server-side

  // Environment
  environment: process.env.NODE_ENV || 'development',

  // Release tracking
  release: process.env.NEXT_PUBLIC_SENTRY_RELEASE || 'development',

  // Filter out known non-actionable errors
  beforeSend(event, hint) {
    // Ignore 404 errors from API routes (expected behavior)
    if (event.exception) {
      const error = hint.originalException as Error & { code?: string; status?: number };
      if (error && (error.status === 404 || error.code === 'ENOENT')) {
        return null;
      }
    }

    return event;
  },
});

export { Sentry };