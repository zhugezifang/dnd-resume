import * as Sentry from '@sentry/react'

const dsn = import.meta.env.VITE_SENTRY_DSN
if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    release: 'dnd-' + __DATE__,
    ignoreErrors: ['ResizeObserver loop limit exceeded', 'chrome-extension'],
    integrations: [Sentry.browserTracingIntegration(), Sentry.replayIntegration()],
    // Tracing Options
    tracesSampleRate: 0.2,
    // Session Replay Options
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1,
  })
}
