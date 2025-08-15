import { StatusCodes } from "http-status-codes";
import { createTestCity, createTestPerson, testServer } from "../jest.setup";

describe("People - get by ID", () => {
  let cityId: string;
  let personId: string;
  let testEmail: string;

  beforeEach(async () => {
    cityId = await createTestCity();
    // Generate unique email for each test run
    testEmail = `john.doe.${Date.now()}@example.com`;
    personId = await createTestPerson("John", "Doe", testEmail, cityId);
  });

  // should get a person by ID
  it("should get a person by ID", async () => {
    const res = await testServer.get(`/people/${personId}`);

    expect(res.statusCode).toEqual(StatusCodes.OK);
    expect(res.body).toHaveProperty("first_name", "John");
    expect(res.body).toHaveProperty("last_name", "Doe");
    expect(res.body).toHaveProperty("email", testEmail);
    expect(res.body).toHaveProperty("city_id", cityId);
  });

  // should try to get a person with an invalid ID
  it("should try to get a person with an invalid ID", async () => {
    const res = await testServer.get("/people/invalid-id");

    expect(res.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(res.body).toHaveProperty("errors.params.id");
  });
});
