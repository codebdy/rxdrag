import { IField, IForm } from "./fieldy";

export interface IValidationError {
  path: string,
  message?: string
}

export interface IValidator{
  //校验成功返回表单值，不成功输出IValidationError[]，
  //Promise应该这样：Promise<unknown, IValidationError[]>, 目前ts版本不支持，后续需要修改
  validateForm(form: IForm): Promise<unknown>
  //校验成功返回字段值，不成功输出IValidationError[]，Promise应该这样：Promise<unknown, IValidationError[]>
  validateField(field: IField): Promise<unknown>

  //syncValidateForm(value: unknown, fieldSchemas: IFieldSchema<ValidateRules>[]): void
  //syncValidateField(value: unknown, fieldSchema: IFieldSchema<ValidateRules>): void
}