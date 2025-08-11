// src/middlewares/validateInput.ts
import { Request, Response, NextFunction } from 'express';
import { ZodType, ZodError } from 'zod';

// List of allowed fields based on your schema
const ALLOWED_FIELDS = [
  'name',
  'email',
  'phone',
  'password',
  'role',
  'location',
  'hasWhatsapp',
  'branch'
];

export const validateBody = (schema: ZodType<any>) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Remove any fields not in the schema
    const filteredBody = Object.keys(req.body)
    .filter(key => ALLOWED_FIELDS.includes(key))
    .reduce((obj: Record<string, any>, key) => {
      obj[key] = req.body[key];
      return obj;
    }, {});
    
    // Validate the filtered body by checking is against the pre-defined schema
    const result = schema.safeParse(filteredBody);
    
    if (!result.success) {
      const error = result.error as ZodError;
      // console.log('Error occured: ', error)
      
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
    console.log("the received data is safe for database to save");
    
    // Assign only the validated and filtered data
    req.body = result.data;
    console.log('Validated Data: ', result.data);
    next();
  };
};


// this part of the code validates the data that whether the received information is fine to be stored inside database