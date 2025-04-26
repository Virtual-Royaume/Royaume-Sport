import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
  NEXT_PUBLIC_COOKIE_PREFIX: z.string().default(crypto.randomUUID()),
});

export const envClient = envSchema.parse({
  NEXT_PUBLIC_WEBSITE_URL: process.env.NEXT_PUBLIC_FRONTEND_URL,
  NEXT_PUBLIC_COOKIE_PREFIX: process.env.NEXT_PUBLIC_BACKEND_URL,
});
