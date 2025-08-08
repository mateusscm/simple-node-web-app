import { Knex } from "knex";
import { ETableNames } from "../ETableNames";

export async function up(knex: Knex) {
  return knex.schema
    .createTable(ETableNames.person, (table) => {
      if (process.env.NODE_ENV === "test") {
        table.uuid("id").defaultTo(knex.fn.uuid()).primary();
        table.string("first_name").checkLength("<=", 100).notNullable();
        table.string("last_name").checkLength("<=", 100).notNullable();
        table.string("email").checkLength("<=", 150).index().notNullable();
        table
          .uuid("city_id")
          .references("id")
          .inTable(ETableNames.city)
          .notNullable();
      } else {
        table.uuid("id").primary().defaultTo(knex.raw("gen_random_uuid()"));
        table.string("first_name", 100).notNullable();
        table.string("last_name", 100).notNullable();
        table.string("email", 150).index().notNullable();
        table
          .uuid("city_id")
          .references("id")
          .inTable(ETableNames.city)
          .notNullable();
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
