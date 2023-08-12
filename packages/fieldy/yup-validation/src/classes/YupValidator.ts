import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { YupValidateRules } from "../interfaces";
import { object, string, boolean, number, ValidationError } from 'yup';


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

    let schema = object().shape({
      name: string().email(),
      age: number().min(18),
    });

    try {
      const result = await schema.validate({ name: "12", age: 11 }, { abortEarly: false });
      return result;
    } catch (err: any) {
      console.log("===>validate inner", err.inner)
      throw err.inner
    }
  }
}