import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const updateById = async (
  id: string,
  city: Omit<ICity, "id">
): Promise<string | Error> => {
  try {
    const result = await Knex(ETableNames.city)
      .update(city)
      .where("id", "=", id);

    if (result === 0) {
      return new Error("City not found or no changes made");
    }
    return id;
  } catch (_) {
    return new Error("Database error while updating city");
  }
};
