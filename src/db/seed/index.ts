import dotenv from "dotenv";
import { connect } from "@planetscale/database";
import { drizzle } from "drizzle-orm/planetscale-serverless/index.js";
import { pokemon } from "../schema";
import seedJson from "../data/pokemon.json" assert { type: "json" };

dotenv.config();

const connection = connect({
  host: process.env["DATABASE_HOST"],
  username: process.env["DATABASE_USERNAME"],
  password: process.env["DATABASE_PASSWORD"],
});

const db = drizzle(connection);

type Pokemon = {
  num: number;
  name: string;
  otherFormes?: string[];
  changesFrom?: string;
};

const seed = async () => {
  const pokemonArray = Object.values(seedJson) as Pokemon[];

  const otherFormes = pokemonArray.reduce((acc, pokemon) => {
    if (pokemon.otherFormes) {
      acc.push(...pokemon.otherFormes);
    }
    if (pokemon.changesFrom) acc.push(pokemon.name);
    return acc;
  }, [] as string[]);

  const seedData = pokemonArray
    .filter((pokemon) => {
      const isOtherForme = otherFormes.includes(pokemon.name);
      const isReal = pokemon.num >= 1;
      return !isOtherForme && isReal;
    })
    .map((pokemon) => {
      return {
        id: pokemon.num,
        name: pokemon.name,
      };
    });

  await db.insert(pokemon).values(...seedData);
};

void seed();
