import { string } from "yup";
import { PredeinedValidator } from "../interfaces";

export const url: PredeinedValidator = (message?: string) => {
  return string().url(message)
}