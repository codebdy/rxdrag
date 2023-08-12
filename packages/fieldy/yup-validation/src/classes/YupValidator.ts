import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { YupValidateRules } from "../interfaces";
import { object, string, boolean, number } from 'yup';


export class YupValidator implements IValidator {
  validateForm(form: IForm<YupValidateRules>): Promise<unknown> {
    const schemas = form.getFieldSchemas()
    for (const fieldSchema of schemas) {
      if (fieldSchema.type === "object") {
        const field = form.getField(fieldSchema.path)
        this.validateOneObject(field?.getValue(), field?.getSubFieldSchemas() || [])
      }
    }
    const rootSchemas = form.getRootFields()
    return this.validateOneObject(form.getValue(), rootSchemas)
  }

  validateField(field: IField<YupValidateRules>): Promise<unknown> {
    const children = field.getSubFieldSchemas() || []
    return this.validateOneObject(field.getValue(), children)
  }


  //校验一个对象
  private async validateOneObject(value: unknown, fieldSchemas: IFieldSchema<YupValidateRules>[]) {
    let schema = object({
      isBig: boolean(),
      count: number().when('isBig', {
        is: true,
        then: (schema) => schema.min(5),
        otherwise: (schema) => schema.min(0),
      }),
    });

    const result = await schema.validate({ value: { isBig: true } })
    return result
  }

}