import { Schema as YupSchema } from "yup";

export interface IValidator {
  name: string
  generateSchema(): YupSchema
}