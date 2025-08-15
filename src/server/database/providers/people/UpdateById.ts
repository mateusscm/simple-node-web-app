import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const updateById = async (
  id: string,
  person: Omit<IPerson, "id">
): Promise<string | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .update(person)
      .where("id", "=", id);

    if (result === 0) {
      return new Error("Person not found or no changes made");
    }
    return id;
  } catch (_) {
    return new Error("Database error while updating person");
  }
};
