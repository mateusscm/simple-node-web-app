import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const getById = async (id: string): Promise<ICity | Error> => {
  try {
    const city = await Knex(ETableNames.city).where("id", "=", id).first();
    if (!city) {
      return new Error("City not found");
    }
    return city;
  } catch (_) {
    return new Error("Database error while fetching city");
  }
};
