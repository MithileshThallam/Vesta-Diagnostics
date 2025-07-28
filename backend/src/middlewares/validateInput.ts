// src/middlewares/validateInput.ts
import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

export const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);

    if (!result.success) {
      const error = result.error as ZodError;

      const formattedErrors: Record<string, string[]> = {};
      for (const issue of error.issues) {
        const field = issue.path[0]?.toString() || 'unknown';
        if (!formattedErrors[field]) formattedErrors[field] = [];
        formattedErrors[field].push(issue.message);
      }

      return res.status(400).json({
        message: 'Validation failed',
        errors: formattedErrors,
      });
    }

    req.body = result.data;
    next();
  };
};
