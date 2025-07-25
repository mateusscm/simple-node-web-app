import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const getAll = async (
  page: number,
  limit: number,
  filter: string,
  id = ""
): Promise<ICity[] | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .select("*")
      .where((builder) => {
        if (id.length > 0) {
          builder.where("id", "=", id);
        }
        builder.where("name", "like", `%${filter}%`);
      })
      .offset((page - 1) * limit)
      .limit(limit);

    if (id.length > 0 && result.every((city) => city.id !== id)) {
      const resultById = await Knex(ETableNames.city)
        .select("*")
        .where("id", "=", id)
        .first();

      if (resultById) return [...result, resultById];
    }

    return result;
  } catch (_) {
    return new Error("Error fetching cities");
  }
};
