import type { Algorithm } from "jsonwebtoken";
import { envServer } from "#/env/server";
import jsonwebtoken from "jsonwebtoken";
import { z } from "zod";

const options = {
  secret: envServer.JWT_AUTH_SECRET,
  algorithm: "HS256" satisfies Algorithm,
  expiresIn: 60 * 60 * 24 + 30, // 30 days
} as const;

const generate = (payload: { accountID: string }): string => {
  return jsonwebtoken.sign(payload, options.secret, {
    algorithm: options.algorithm,
    expiresIn: options.expiresIn,
  });
};

const parse = (jwt: string | undefined): { accountID: string } => {
  if (typeof jwt !== "string") throw Error("JWT is undefined");

  const payload = jsonwebtoken.verify(jwt, options.secret);
  const payloadParsed = z.object({ accountID: z.string() }).parse(payload);

  return payloadParsed;
};

export const jwtAccount = { generate, parse };
