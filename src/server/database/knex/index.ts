import { knex } from "knex";
import { development, production, test } from "./Environment";

const getEnv = () => {
  console.log("NODE_ENV:", process.env.NODE_ENV);
  if (process.env.NODE_ENV === "production") return production;
  if (process.env.NODE_ENV === "test") return test;
  return development;
};

export const Knex = knex(getEnv());
