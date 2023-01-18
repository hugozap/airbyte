import { AirbyteWebappConfig } from "./types";

export const config: AirbyteWebappConfig = {
  segment: {
    token: window.SEGMENT_TOKEN ?? process.env.REACT_APP_SEGMENT_TOKEN,
    enabled: window.TRACKING_STRATEGY === "segment",
  },
  apiUrl:
    window.API_URL ??
    process.env.REACT_APP_API_URL ??
    `${window.location.protocol}//${window.location.hostname}:8001/api`,
  connectorBuilderApiUrl:
    process.env.REACT_APP_CONNECTOR_BUILDER_API_URL ?? `${window.location.protocol}//${window.location.hostname}:8003`,
  healthCheckInterval: 20000,
  version: window.AIRBYTE_VERSION ?? "dev",
  integrationUrl: process.env.REACT_APP_INTEGRATION_DOCS_URLS ?? "/docs",
  oauthRedirectUrl: `${window.location.protocol}//${window.location.host}`,
  cloudApiUrl: window.CLOUD_API_URL ?? process.env.REACT_APP_CLOUD_API_URL,
  cloudPublicApiUrl: process.env.REACT_APP_CLOUD_PUBLIC_API_URL,
  firebase: {
    apiKey: window.FIREBASE_API_KEY ?? process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: window.FIREBASE_AUTH_DOMAIN ?? process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    authEmulatorHost: window.FIREBASE_AUTH_EMULATOR_HOST ?? process.env.REACT_APP_FIREBASE_AUTH_EMULATOR_HOST,
  },
  intercom: {
    appId: process.env.REACT_APP_INTERCOM_APP_ID,
  },
  launchDarkly: window.LAUNCHDARKLY_KEY ?? process.env.REACT_APP_LAUNCHDARKLY_KEY,
};

export class MissingConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "MissingConfigError";
  }
}
