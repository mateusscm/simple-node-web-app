import { StatusCodes } from "http-status-codes";
import { testServer, createTestCity } from "../jest.setup";

describe("People - create", () => {
  let cityId: string;

  beforeEach(async () => {
    cityId = await createTestCity();
  });

  // should create a new person
  it("should create a new person", async () => {
    const resPerson = await testServer.post("/people").send({
      first_name: "John",
      last_name: "Doe",
      email: `john.doe.${Date.now()}@example.com`,
      city_id: cityId,
    });

    expect(resPerson.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resPerson.body).toEqual("string");
  });

  // should try to create a short name person
  it("should try to create a short name person", async () => {
    const resPerson = await testServer.post("/people").send({
      first_name: "J",
      last_name: "Doe",
      email: `j.doe.${Date.now()}@example.com`,
      city_id: cityId,
    });

    expect(resPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resPerson.body).toHaveProperty("errors.body.first_name");
  });

  // should try to create a person with no name
  it("should try to create a person with no name", async () => {
    const resPerson = await testServer.post("/people").send({
      first_name: "",
      last_name: "",
      email: "",
      city_id: cityId,
    });

    expect(resPerson.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resPerson.body).toHaveProperty("errors.body.first_name");
    expect(resPerson.body).toHaveProperty("errors.body.last_name");
    expect(resPerson.body).toHaveProperty("errors.body.email");
  });
});
