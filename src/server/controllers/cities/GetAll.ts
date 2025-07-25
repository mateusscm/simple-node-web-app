import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { z } from "zod";
import { CitiesProvider } from "../../database/providers/cities";

const queryCitiesSchema = z
  .object({
    id: z.string().optional().default(""),
    page: z
      .string()
      .regex(/^\d+$/, "Page number must be a valid integer")
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1, "Page number must be at least 1"))
      .optional(),
    limit: z
      .string()
      .regex(/^\d+$/, "Limit must be a valid integer")
      .transform((val) => parseInt(val, 10))
      .pipe(z.number().min(1, "Limit must be at least 1"))
      .optional(),
    filter: z
      .string()
      .min(0, "Filter must be at least 0 characters long")
      .max(50, "Filter must be at most 50 characters long")
      .optional(),
  })
  .strict();

type QueryCitiesInput = z.infer<typeof queryCitiesSchema>;

export const getAllValidation = validation({
  query: queryCitiesSchema,
});

export const getAll = async (
  req: Request<{}, {}, {}, QueryCitiesInput>,
  res: Response
) => {
  const result = await CitiesProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || "",
    req.query.id || ""
  );

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  return res.status(StatusCodes.OK).json(result);
};
