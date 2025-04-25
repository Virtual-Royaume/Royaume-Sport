import type { NextRequest } from "next/server";
import type { NextResponse } from "next/server";
import { getDiscordUserInfoFromOAuthCode } from "#/actions/discord";

export const middleware = async (request: NextRequest): Promise<NextResponse | void> => {
  // Finalize OAuth2 authentication process:
  const oauth2Code = request.nextUrl.searchParams.get("code");
  if (oauth2Code) {
    const userInfo = await getDiscordUserInfoFromOAuthCode(oauth2Code);
    console.log(userInfo);
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
};
