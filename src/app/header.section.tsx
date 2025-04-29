"use client";

import type { Component } from "#/utils/react";
import { Button } from "#/ui/button";
import Link from "next/link";

export const SectionHeader: Component<{ discordOAuthURL: string }> = ({ discordOAuthURL }) => {
  return (
    <div className="flex items-center justify-between gap-4 mx-8 my-6">
      <p className="text-3xl font-semibold">ROYAUME STATISTIQUES SPORT</p>

      <div className="flex items-center gap-4">
        <Button variant="secondary" onClick={() => alert("test")}>
          Edit
        </Button>

        <Button asChild>
          <Link href={discordOAuthURL}>
            Login with Discord
          </Link>
        </Button>
      </div>
    </div>
  );
};
