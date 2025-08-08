import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { IPerson } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = ""
): Promise<IPerson[] | Error> => {
  try {
    const result = await Knex(ETableNames.person)
      .select("*")
      .where((builder) => {
        if (id.length > 0) {
          builder.where("id", "=", id);
        }
        builder
          .where("first_name", "like", `%${filter}%`)
          .orWhere("last_name", "like", `%${filter}%`);
      })
      .offset((page - 1) * limit)
      .limit(limit);

    if (id.length > 0 && result.every((person) => person.id !== id)) {
      const resultById = await Knex(ETableNames.person)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (_) {
    return new Error("Error fetching people");
  }
};
