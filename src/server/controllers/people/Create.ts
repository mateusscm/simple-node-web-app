import z from "zod";
import { validation } from "../../shared/middleware";
import { Request, Response } from "express";
import { IPerson } from "../../database/models";
import { PeopleProvider } from "../../database/providers/people";
import { StatusCodes } from "http-status-codes";

const createPersonSchema = z
  .object({
    first_name: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(2, "First name must be at least 2 characters long")
      .max(50, "First name must be at most 50 characters long"),
    last_name: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(2, "Last name must be at least 2 characters long")
      .max(50, "Last name must be at most 50 characters long"),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format"),
    city_id: z.string().uuid("Invalid City ID format"),
  })
  .strict();

export const createValidation = validation({
  body: createPersonSchema,
});

export const create = async (req: Request<{}, {}, IPerson>, res: Response) => {
  const result = await PeopleProvider.create(req.body);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.CREATED).json(result);
};
