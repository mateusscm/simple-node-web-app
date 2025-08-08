import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const create = async (
  person: Omit<IPerson, "id">
): Promise<string | Error> => {
  try {
    const [result] = await Knex(ETableNames.person)
      .insert(person)
      .returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "string") {
      return result;
    }

    return new Error("Error creating person: Invalid result type");
  } catch (_error) {
    console.error(_error);
    return new Error("Error creating person");
  }
};
