import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.person, (table) => {
      if (process.env.NODE_ENV === "test") {
        // test (SQLite)
        table.uuid("id").defaultTo(knex.fn.uuid()).primary();
        table.string("first_name").notNullable();
        table.string("last_name").notNullable();
        table.string("email").unique().notNullable();
        table
          .uuid("city_id")
          .references("id")
          .inTable(ETableNames.city)
          .notNullable()
          .onUpdate("CASCADE")
          .onDelete("RESTRICT");
      } else {
        // dev & production (PG)
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("first_name", 100).notNullable();
        table.string("last_name", 100).notNullable();
        table.string("email", 150).unique().notNullable();
        table
          .uuid("city_id")
          .references("id")
          .inTable(ETableNames.city)
          .notNullable()
          .onUpdate("CASCADE")
          .onDelete("RESTRICT");
      }

      table.comment("Person table to store person information");
    })
    .then(() => {
      console.log(`# Created table: ${ETableNames.person}`);
    });
}

export async function down(knex: Knex) {
  return knex.schema.dropTable(ETableNames.person).then(() => {
    console.log(`# Dropped table: ${ETableNames.person}`);
  });
}
