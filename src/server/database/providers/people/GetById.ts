import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const getById = async (id: string): Promise<IPerson | Error> => {
  try {
    const person = await Knex(ETableNames.person)
      .select("*")
      .where("id", "=", id)
      .first();
    if (!person) {
      return new Error("Person not found");
    }
    return person;
  } catch (_) {
    return new Error("Database error");
  }
};
