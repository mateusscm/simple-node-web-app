import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { z } from "zod";
import { CitiesProvider } from "../../database/providers/cities";
import { ICity } from "../../database/models";

const paramCitySchema = z
  .object({
    id: z.string().uuid("Invalid city ID"),
  })
  .strict();

const updateCitySchema = z
  .object({
    name: z
      .string({
        required_error: "Name is required",
        invalid_type_error: "Name must be a string",
      })
      .min(3, "City name must be at least 3 characters long")
      .max(50, {
        message: "City name must be between 3 and 50 characters long",
      })
      .optional(),
  })
  .strict()
  .refine((data) => Object.keys(data).length > 0, {
    message: "At least one field must be provided for update",
  });

type ParamCityInput = z.infer<typeof paramCitySchema>;

export const updateByIdValidation = validation({
  params: paramCitySchema,
  body: updateCitySchema,
});

export const updateById = async (
  req: Request<ParamCityInput, {}, ICity>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "City ID is required",
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

  const updatedCity = await CitiesProvider.updateById(
    req.params.id,
    updateData
  );

  if (updatedCity instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: updatedCity.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(updatedCity);
};
