import type { ComponentAsync } from "#/utils/react";
import { SectionHeader } from "./header.section";
import { SectionTable } from "./table.section";
import { getDiscordOAuthURL } from "#/actions/discord";
import { getMetrics } from "#/actions/metric";
import { Separator } from "#/ui/separator";

const Page: ComponentAsync = async () => {
  const discordOAuthURL = await getDiscordOAuthURL();
  const metrics = await getMetrics();

  return (
    <div>
      <SectionHeader discordOAuthURL={discordOAuthURL} />
      <Separator />
      <SectionTable metrics={metrics} />
    </div>
  );
};

export default Page;
