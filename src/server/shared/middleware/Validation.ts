import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { ZodSchema, ZodError } from "zod";

type TProperty = "body" | "params" | "query" | "headers";

type TAllSchemas = Record<TProperty, ZodSchema>;

type TValidation = (schemas: Partial<TAllSchemas>) => RequestHandler;

export const validation: TValidation = (schemas) => async (req, res, next) => {
  const errorsResult: Record<string, Record<string, string>> = {};

  for (const [field, schema] of Object.entries(schemas)) {
    try {
      await schema.parse(req[field]);
    } catch (err) {
      const zodError = err as ZodError;
      const errors: Record<string, string> = {};

      zodError.errors.forEach((error) => {
        if (!error.path.length) return;
        errors[error.path.join(".")] = error.message;
      });

      errorsResult[field] = errors;
    }
  }

  if (Object.entries(errorsResult).length === 0) {
    return next();
  } else {
    return res.status(StatusCodes.BAD_REQUEST).json({
      errors: errorsResult,
    });
  }
};
