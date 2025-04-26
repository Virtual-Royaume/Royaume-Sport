import { envClient } from "#/env/client";

export const COOKIES_KEYS = {
  JWT_AUTH_TOKEN: `${envClient.NEXT_PUBLIC_COOKIE_PREFIX}-royaume-auth-jwt`,
} as const;
