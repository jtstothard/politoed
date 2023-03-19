import { smallint, mysqlTable, text } from "drizzle-orm/mysql-core";

export const pokemon = mysqlTable("pokemon", {
  id: smallint("id").primaryKey(),
  name: text("name").notNull(),
});
