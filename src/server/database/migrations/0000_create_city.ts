import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.city, (table) => {
      table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
      table.string("name", 150).index().notNullable();

      table.comment("City table to store city information");
    })
    .then(() => {
      console.log(`# Created table: ${ETableNames.city}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.city).then(() => {
    console.log(`# Dropped table: ${ETableNames.city}`);
  });
}
