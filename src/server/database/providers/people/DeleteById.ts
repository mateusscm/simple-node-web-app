import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const deleteById = async (id: string): Promise<string | Error> => {
  try {
    const result = await Knex(ETableNames.person).where("id", "=", id).del();

    if (result > 0) {
      return "Person deleted successfully";
    }

    return new Error("Person not found or already deleted");
  } catch (_) {
    return new Error("Error deleting person");
  }
};
