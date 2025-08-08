import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  const hasTable = await knex.schema.hasTable(ETableNames.city);
  
  if (!hasTable) {
    return knex.schema
      .createTable(ETableNames.city, (table) => {
        if (process.env.NODE_ENV === "test") {
          table.uuid("id").defaultTo(knex.fn.uuid()).primary();
          table.string("name").checkLength("<=", 150).index().notNullable();
        } else {
          table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
          table.string("name", 150).index().notNullable();
        }

        table.comment("City table to store city information");
      })
      .then(() => {
        console.log(`# Created table: ${ETableNames.city}`);
      });
  } else {
    console.log(`# Table ${ETableNames.city} already exists, skipping creation`);
    return Promise.resolve();
  }
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.city).then(() => {
    console.log(`# Dropped table: ${ETableNames.city}`);
  });
}
