import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";

import { z } from "zod";
import { CitiesProvider } from "../../database/providers/cities";

const paramCitySchema = z
  .object({
    id: z.string().uuid("Invalid city ID"),
  })
  .strict();

type ParamCityInput = z.infer<typeof paramCitySchema>;

export const getByIdValidation = validation({
  params: paramCitySchema,
});

export const getById = async (
  req: Request<ParamCityInput, {}, {}>,
  res: Response
) => {
  if (!req.params.id) {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: {
        default: "City ID is required",
      },
    });
  }

  const city = await CitiesProvider.getById(req.params.id);
  if (city instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: city.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(city);
};
