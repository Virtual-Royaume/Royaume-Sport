import type { AnyZodObject, output } from "zod";

export const fetchJSON = async <Schema extends AnyZodObject>(
  { url, request, schema }: { url: string; schema: Schema; request?: RequestInit },
): Promise<output<Schema>> => {
  const response = await fetch(url, request);
  if (!response.ok) throw Error("API responded with non-200 code");

  const json = schema.parse(await response.json()) as Schema;
  return json;
};
