import type { NextRequest } from "next/server";
import { COOKIES_KEYS } from "./utils/cookie";
import { getDiscordUserInfoFromOAuthCode } from "#/actions/discord";
import { postgres, tableUser } from "#/db";
import { NextResponse } from "next/server";

export const middleware = async (request: NextRequest): Promise<NextResponse | void> => {
  // Finalize OAuth2 authentication process:
  const oauth2Code = request.nextUrl.searchParams.get("code");
  if (oauth2Code) {
    const userInfo = await getDiscordUserInfoFromOAuthCode(oauth2Code);
    const userInsert: typeof tableUser.$inferInsert = {
      id: userInfo.id,
      email: userInfo.email,
      avatarURL: [
        "https://cdn.discordapp.com/avatars",
        `/${userInfo.id}`,
        `/${userInfo.avatar}`,
        `.${userInfo.avatar.startsWith("a_") ? "gif" : "png"}`,
      ].join(""),
      hexColor: userInfo.banner_color,
      username: userInfo.global_name,
      usertag: userInfo.username,
    };

    await postgres
      .insert(tableUser)
      .values(userInsert)
      .onConflictDoUpdate({ target: tableUser.id, set: userInsert });

    const response = NextResponse.redirect(new URL("/", request.url));
    response.cookies.set({
      name: COOKIES_KEYS.JWT_AUTH_TOKEN,
      value: "bar",
      path: "/",
    });
    return response;
  }
};

/**
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 *
 * Ending with:
 * - .png, .js or .svg
 */
export const config = {
  // NextJS regex doesn't seem to work normally.
  // eslint-disable-next-line no-useless-escape
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*(?<!\.png|\.js|\.svg)$)",
  runtime: "nodejs",
};
