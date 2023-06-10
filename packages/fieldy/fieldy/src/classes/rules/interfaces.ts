import { Schema as YupSchema } from "yup";

export interface IValidator {
  generateSchema(): YupSchema
}