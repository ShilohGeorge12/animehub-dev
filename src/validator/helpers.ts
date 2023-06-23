import { ValidationError } from "joi";

export const ifError = (error: ValidationError | undefined) => {
  if(!error) return;
  console.log( error );
  const errArr: (string | null)[] = [];
  error.details.map(err => errArr.push(err.message));
  return errArr;
};