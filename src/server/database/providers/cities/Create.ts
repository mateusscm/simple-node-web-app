import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";
import { ICity } from "../../models";

export const create = async (
  city: Omit<ICity, "id">
): Promise<string | Error> => {
  try {
    const [result] = await Knex(ETableNames.city).insert(city).returning("id");

    if (typeof result === "object") {
      return result.id;
    } else if (typeof result === "string") {
      return result;
    }

    return new Error("Erro ao criar cidade");
  } catch (_) {
    return new Error("Erro ao criar cidade");
  }
};
