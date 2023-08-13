import { string } from "yup";
import { PredeinedValidator } from "../interfaces";

export const email: PredeinedValidator = (message?: string) => {
  return string().email(message)
}