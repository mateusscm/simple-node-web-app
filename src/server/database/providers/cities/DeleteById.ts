import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: string): Promise<string | Error> => {
  try {
    const result = await Knex(ETableNames.city).where("id", "=", id).del();

    if (result > 0) {
      return "City deleted successfully";
    }

    return new Error("City not found or already deleted");
  } catch (_) {
    return new Error("Error deleting city");
  }
};
