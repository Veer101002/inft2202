import { validationResult } from 'express-validator';
import { ConflictError } from '../errors/ConflictError.js';

function doValidation (request, response, next) 
{
  const result = validationResult(request);
  if (result.isEmpty()) {
    // Pass the sanitized data to the next middleware
    //request.sanitizedData = matchedData(request); //No need, express will do it under the hood
    return next(); 
  }
  const errObj = { 
    errors: result.array() 
  };
  //response.status(409).json(errObj);
  next(new ConflictError('Input Validation Failed', errObj));
}

export function checkValidation (rules) {
  return [...rules, doValidation]
}