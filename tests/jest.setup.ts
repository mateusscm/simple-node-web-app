import supertest from "supertest";
import { StatusCodes } from "http-status-codes";
import { server } from "../src/server/Server";
import { Knex } from "../src/server/database/knex";

beforeAll(async () => {
  await Knex.migrate.latest();
  await Knex.seed.run();
});

beforeEach(async () => {
  // Clean up data before each test to avoid UNIQUE constraint violations
  await Knex("person").del();
  await Knex("city").del();
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

// Helper function to create a test person with optional unique email generation
export const createTestPerson = async (
  firstName: string,
  lastName: string,
  email?: string,
  cityId?: string
): Promise<string> => {
  // Generate unique email if not provided
  const uniqueEmail =
    email ||
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}.${Date.now()}@example.com`;

  // Create city if not provided
  const testCityId = cityId || (await createTestCity());

  const response = await testServer.post("/people").send({
    first_name: firstName,
    last_name: lastName,
    email: uniqueEmail,
    city_id: testCityId,
  });

  if (response.statusCode !== StatusCodes.CREATED) {
    throw new Error(`Failed to create test person: ${response.body}`);
  }

  return response.body;
};
