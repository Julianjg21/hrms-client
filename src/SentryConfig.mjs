import * as Sentry from "@sentry/react";


// Initialize Sentry with configuration settings
Sentry.init({
  dsn: process.env.REACT_APP_SENTRY_DNS, // Sentry Data Source Name (DSN) for tracking errors
  environment: process.env.REACT_APP_NODE_ENV || "development", // Set the environment (production, development)
});
