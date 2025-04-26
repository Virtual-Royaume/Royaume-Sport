import { pgTable, varchar, integer, pgEnum, uuid, text, unique, timestamp } from "drizzle-orm/pg-core";

export const tableUser = pgTable("user", {
  id: varchar("id", { length: 50 }).primaryKey(), // Discord ID need to be used for coherent updates
  email: varchar("email", { length: 255 }).notNull(),
  usertag: varchar("usertag", { length: 50 }).notNull(),
  username: varchar("username", { length: 100 }).notNull(),
  hexColor: varchar("hex_color", { length: 7 }).notNull(),
  avatarURL: varchar("avatar_url", { length: 2048 }).notNull(),
});

export const enumMetricType = pgEnum("metric_type", ["SECOND", "COUNT", "SPEED"]);
export const tableMetricDefinition = pgTable("metric_definition", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  description: text("description").notNull(),
  type: enumMetricType("type").notNull(),
});

export const tableUserMetric = pgTable("user_metric", {
  userID: varchar("id").notNull().references(() => tableUser.id, { onDelete: "cascade" }),
  metricDefinitionID: uuid("metric_definition_id").notNull().references(() => tableMetricDefinition.id, { onDelete: "cascade" }),
  value: integer("value").notNull(),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().$onUpdate(() => new Date()),
}, (t) => [unique().on(t.userID, t.metricDefinitionID)]);
