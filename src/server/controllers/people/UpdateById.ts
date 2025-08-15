import { Request, Response } from "express";
import z from "zod";
import { IPerson } from "../../database/models";
import { validation } from "../../shared/middleware";
import { StatusCodes } from "http-status-codes";
import { PeopleProvider } from "../../database/providers/people";

const paramPersonSchema = z
  .object({
    id: z.string().uuid("Invalid person ID"),
  })
  .strict();

const updatePersonSchema = z
  .object({
    first_name: z
      .string({
        required_error: "First name is required",
        invalid_type_error: "First name must be a string",
      })
      .min(3, "First name must be at least 3 characters long")
      .max(50, {
        message: "First name must be between 3 and 50 characters long",
      })
      .optional(),
    last_name: z
      .string({
        required_error: "Last name is required",
        invalid_type_error: "Last name must be a string",
      })
      .min(3, "Last name must be at least 3 characters long")
      .max(50, {
        message: "Last name must be between 3 and 50 characters long",
      })
      .optional(),
    email: z
      .string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
      })
      .email("Invalid email format")
      .optional(),
    city_id: z.string().uuid("Invalid city ID").optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

type ParamPersonInput = z.infer<typeof paramPersonSchema>;

export const updateByIdValidation = validation({
  params: paramPersonSchema,
  body: updatePersonSchema,
});

export const updateById = async (
  req: Request<ParamPersonInput, {}, IPerson>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "Person ID is required",
      },
    });
  }

  const updateData = req.body;
  if (Object.keys(updateData).length === 0) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "At least one field must be provided for update",
      },
    });
  }

  const updatedPerson = await PeopleProvider.updateById(
    req.params.id,
    updateData
  );
  if (!updatedPerson) {
    return res.status(StatusCodes.NOT_FOUND).json({
      errors: {
        default: "Person not found",
      },
    });
  }

  return res.status(StatusCodes.OK).json(updatedPerson);
};
