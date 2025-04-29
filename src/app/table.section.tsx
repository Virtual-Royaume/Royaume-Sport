"use client";

import type { getMetrics } from "#/actions/metric";
import type { Component } from "#/utils/react";
import { Avatar, AvatarFallback, AvatarImage } from "#/ui/avatar";
import { Button } from "#/ui/button";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "#/ui/table";
import { ArrowUpDown } from "lucide-react";

type Data = Awaited<ReturnType<typeof getMetrics>>;

export const SectionTable: Component<{ metrics: Data }> = ({ metrics }) => {
  return (
    <div className="mx-8 my-6 rounded overflow-hidden border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              AVATAR
            </TableHead>

            <TableHead>
              <div className="inline-flex items-center gap-2">
                <p>PSEUDO</p>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-5"
                  onClick={() => console.log("tgm")}
                >
                  <ArrowUpDown className="size-3" />
                </Button>
              </div>
            </TableHead>

            <TableHead className="text-right">
              <div className="inline-flex items-center gap-2">
                <p>AMOUNT 1</p>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-5"
                  onClick={() => console.log("tgm")}
                >
                  <ArrowUpDown className="size-3" />
                </Button>
              </div>
            </TableHead>

            <TableHead className="text-right">
              <div className="inline-flex items-center gap-2">
                <p>AMOUNT 2</p>

                <Button
                  variant="outline"
                  size="icon"
                  className="size-5"
                  onClick={() => console.log("tgm")}
                >
                  <ArrowUpDown className="size-3" />
                </Button>
              </div>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {metrics.map((metric) => (
            <TableRow key={metric.tagname}>
              <TableCell className="w-14">
                <Avatar className="mx-auto size-10">
                  <AvatarImage src={metric.avatar} alt={metric.tagname} />
                  <AvatarFallback>{metric.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
              </TableCell>

              <TableCell>
                <div>
                  <p className="text-xl font-semibold text-foreground">{metric.username}</p>
                  <p className="text-accent-foreground">
                    @
                    {metric.tagname}
                  </p>
                </div>
              </TableCell>

              <TableCell className="text-right">
                {Math.ceil(Math.random() * 50)}
              </TableCell>

              <TableCell className="text-right">
                {Math.ceil(Math.random() * 50)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TableCell colSpan={1000}>
              Showing
              {" "}
              {metrics.length}
              {" "}
              runners
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};
