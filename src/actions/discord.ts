"use server";

import { envServer } from "#/env/server";
import { fetchJSON } from "#/utils/request";
import { z } from "zod";

export const getDiscordOAuthURL = async () => {
  const url = new URL("https://discord.com/oauth2/authorize");
  url.search = new URLSearchParams({
    client_id: envServer.DISCORD_CLIENT_ID,
    response_type: "code",
    redirect_uri: envServer.NEXT_PUBLIC_WEBSITE_URL,
    scope: ["identify", "email"].join(" "),
  }).toString();

  return url.toString();
};

export const getDiscordUserInfoFromOAuthCode = async (code: string) => {
  // Get authentication token from the received code:
  const responseToken = await fetchJSON({
    url: "https://discord.com/api/oauth2/token",
    request: {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        client_id: envServer.DISCORD_CLIENT_ID,
        client_secret: envServer.DISCORD_CLIENT_SECRET,
        redirect_uri: envServer.NEXT_PUBLIC_WEBSITE_URL,
        grant_type: "authorization_code",
        code: code,
      }),
    },
    schema: z.object({
      token_type: z.string(),
      access_token: z.string(),
      refresh_token: z.string(),
      expires_in: z.number(),
      scope: z.string(),
    }),
  });

  // Get user information:
  const responseUser = await fetchJSON({
    url: "https://discord.com/api/v10/users/@me",
    request: {
      headers: {
        Authorization: `${responseToken.token_type} ${responseToken.access_token}`,
      },
    },
    schema: z.object({
      id: z.string(),
      username: z.string(),
      avatar: z.string(),
      global_name: z.string(),
      banner_color: z.string(),
      locale: z.string(),
      email: z.string(),
    }),
  });

  return responseUser;
};
