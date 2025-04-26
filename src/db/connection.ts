import * as schema from "./schema";
import { drizzle } from "drizzle-orm/node-postgres";

export const postgres = drizzle(process.env.DATABASE_URL!, { schema: schema });
