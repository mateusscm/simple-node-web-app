import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { z } from "zod";

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
type UpdateCityInput = z.infer<typeof updateCitySchema>;

export const updateByIdValidation = validation({
  params: paramCitySchema,
  body: updateCitySchema,
});

export const updateById = async (
  req: Request<ParamCityInput, {}, UpdateCityInput>,
  res: Response
) => {
  console.log(req.params);
  console.log(req.body);

  return res.status(StatusCodes.OK).send("Not implemented yet");
};
