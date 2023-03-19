import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless/index.js";
import { pokemon } from "@/db/schema";
import { createTRPCRouter, publicProcedure } from "../trpc";

const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

const db = drizzle(connection);

export const pokemonRouter = createTRPCRouter({
  getAll: publicProcedure.query(() => db.select().from(pokemon)),
});
