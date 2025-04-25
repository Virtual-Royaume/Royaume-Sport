import type { ComponentAsync } from "#/utils/react";
import { getDiscordOAuthURL } from "#/actions/discord";
import { Button } from "#/ui/button";
import Link from "next/link";

const Page: ComponentAsync = async () => {
  const authURL = await getDiscordOAuthURL();

  return (
    <div>
      <Button asChild>
        <Link href={authURL}>
          Login with Discord
        </Link>
      </Button>
    </div>
  );
};

export default Page;
