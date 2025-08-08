import { StatusCodes } from "http-status-codes";
import { Request, Response } from "express";
import { validation } from "../../shared/middleware";
import { z } from "zod";
import { CitiesProvider } from "../../database/providers/cities";
import { PeopleProvider } from "../../database/providers/people";

const queryPeopleSchema = z
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

type QueryPeopleInput = z.infer<typeof queryPeopleSchema>;

export const getAllValidation = validation({
  query: queryPeopleSchema,
});

export const getAll = async (
  req: Request<{}, {}, {}, QueryPeopleInput>,
  res: Response
) => {
  const result = await PeopleProvider.getAll(
    req.query.page || 1,
    req.query.limit || 10,
    req.query.filter || "",
    req.query.id || ""
  );
  const resultCount = await CitiesProvider.count(req.query.filter);

  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  } else if (resultCount instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: resultCount.message,
      },
    });
  }

  res.setHeader("access-control-expose-headers", "x-total-count");
  res.setHeader("x-total-count", resultCount);

  return res.status(StatusCodes.OK).json(result);
};
