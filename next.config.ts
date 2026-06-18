import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import { withSentryConfig } from '@sentry/nextjs';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  // Enable React strict mode for better error detection
  reactStrictMode: true,

  // Source maps for Sentry
  productionBrowserSourceMaps: true,
};

// Sentry configuration for source maps upload
const sentryWebpackPluginOptions = {
  silent: true, // Suppresses logs during build
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  authToken: process.env.SENTRY_AUTH_TOKEN,
};

let exportedConfig = withNextIntl(nextConfig);

// Only apply Sentry in production builds
if (process.env.NODE_ENV === 'production' && process.env.SENTRY_AUTH_TOKEN) {
  exportedConfig = withSentryConfig(exportedConfig, sentryWebpackPluginOptions);
}

export default exportedConfig;
