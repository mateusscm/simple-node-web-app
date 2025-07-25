import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { z } from "zod";
import { CitiesProvider } from "../../database/providers/cities";
import { ICity } from "../../database/models";

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

export const createValidation = validation({
  body: createCitySchema,
});

export const create = async (req: Request<{}, {}, ICity>, res: Response) => {
  const result = await CitiesProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
