import { ETableNames } from "../../ETableNames";
import { Knex } from "../../knex";

export const count = async (filter = ""): Promise<number | Error> => {
  try {
    const [{ count }] = await Knex(ETableNames.person)
      .where("first_name", "like", `%${filter}%`)
      .andWhere("last_name", "like", `%${filter}%`)
      .orWhere("email", "like", `%${filter}%`)
      .count<[{ count: number }]>("* as count");

    if (Number.isInteger(Number(count))) return Number(count);

    return new Error("Error while counting people");
  } catch (_) {
    return new Error("Error while counting people");
  }
};
