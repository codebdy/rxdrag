import { IFieldSchema } from "./fieldy";

export interface IValidationError {
  path: string,
  messages?: string[]
}

export interface IValidator<ValidateRules = unknown> {
  //校验成功返回表单值，不成功输出IValidationError[]，
  //Promise应该这样：Promise<unknown, IValidationError[]>, 目前ts版本不支持，后续需要修改
  validateForm(value: unknown, fieldSchemas: IFieldSchema<ValidateRules>[]): Promise<unknown>
  //校验成功返回字段值，不成功输出IValidationError[]，Promise应该这样：Promise<unknown, IValidationError[]>
  validateField(value: unknown, fiesdSchema: IFieldSchema<ValidateRules>, subFieldSchemas?: IFieldSchema<ValidateRules>[]): Promise<unknown>

  //syncValidateForm(value: unknown, fieldSchemas: IFieldSchema<ValidateRules>[]): void
  //syncValidateField(value: unknown, fiesdSchema: IFieldSchema<ValidateRules>): void
}