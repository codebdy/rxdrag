import { string } from "yup";
import { PredeinedValidator } from "../interfaces";

export const uuid: PredeinedValidator = (message?: string) => {
  return string().uuid(message)
}