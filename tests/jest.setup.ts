import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import { server } from "../src/server/Server";
import { Knex } from "../src/server/database/knex";

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
});

afterAll(async () => {
  await Knex.destroy();
});

export const testServer = supertest(server);

// Helper function to create a test city
export const createTestCity = async (
  name: string = "Test City"
): Promise<string> => {
  const response = await testServer.post("/cities").send({ name });

  if (response.statusCode !== StatusCodes.CREATED) {
    throw new Error(`Failed to create test city: ${response.body}`);
  }

  return response.body;
};
