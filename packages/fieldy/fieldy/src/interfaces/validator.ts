import { IFieldSchema } from "./fieldy";

export interface IValidationFeedback {
  path: string,
  code?: 'error' | 'success' | 'warning',
  messages?: string[]
}

export interface IValidator<ValidateRules = unknown> {
  validateForm(value: unknown, fieldSchemas: IFieldSchema<ValidateRules>[]): Promise<IValidationFeedback[]>
  validateField(value: unknown, fiesdSchema: IFieldSchema<ValidateRules>): Promise<IValidationFeedback[]>

  //syncValidateForm(value: unknown, fieldSchemas: IFieldSchema<ValidateRules>[]): void
  //syncValidateField(value: unknown, fiesdSchema: IFieldSchema<ValidateRules>): void
}