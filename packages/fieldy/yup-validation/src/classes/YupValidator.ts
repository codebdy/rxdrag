import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { YupValidateRules } from "../interfaces";
import { ref, object, string, boolean } from 'yup';


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
    this.validateOneObject(form.getValue(), rootSchemas)
    throw new Error("Method not implemented.");
  }

  validateField(field: IField<YupValidateRules>): Promise<unknown> {
    const children = field.getSubFieldSchemas() || []
    this.validateOneObject(field.getValue(), children)
    throw new Error("Method not implemented.");
  }


  //校验一个对象
  private validateOneObject(value: unknown, fieldSchemas: IFieldSchema<YupValidateRules>[]) {

  }

}