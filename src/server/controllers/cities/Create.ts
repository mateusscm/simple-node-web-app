import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";

const createCitySchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, "City name must be at least 3 characters long")
      .max(50, {
        message: "City name must be between 3 and 50 characters long",
      }),
  })
  .strict();

type CreateCityInput = z.infer<typeof createCitySchema>;

export const createValidation = validation({
  body: createCitySchema,
});

export const create = async (
  req: Request<{}, {}, CreateCityInput>,
  res: Response
) => {
  console.log(req.body);
  // const validatedData: CreateCityInput | undefined = req.body;

  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send("Not implemented yet");
};
