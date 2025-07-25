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
        if (error.code === "unrecognized_keys") {
          // Para erros de chaves não reconhecidas, criar um erro para cada chave
          error.keys?.forEach((key) => {
            errors[key] = "Unrecognized key";
          });
        } else if (error.path.length === 0) {
          // Outros erros no nível raiz
          errors["_root"] = error.message;
        } else {
          // Erro em um campo específico
          const fieldPath = error.path.join(".");
          errors[fieldPath] = error.message;
        }
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
