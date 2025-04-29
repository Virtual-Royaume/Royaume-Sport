import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_WEBSITE_URL: z.string().url(),
  NEXT_PUBLIC_COOKIE_PREFIX: z.string().default(Math.random().toString(36).slice(2, 8)),

  DATABASE_URL: z.string().url(),

  JWT_AUTH_SECRET: z.string(),

  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),
});

export const envServer = envSchema.parse(process.env);
