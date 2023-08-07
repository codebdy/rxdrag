import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { YupValidateRules } from "../interfaces";


export class YupValidator implements IValidator {
  validateForm(form: IForm<YupValidateRules>): Promise<unknown> {
    const schemas = form.getFieldSchemas()
    for (const fieldSchema of schemas) {
      if (fieldSchema.type === "object") {
        const field = form.getField(fieldSchema.path)
        this.validateOneObject(field?.getValue(), field?.getSubFieldSchemas()||[])
      }
    }
    this.validateOneObject(form.getValue(), schemas)
    throw new Error("Method not implemented.");
  }

  validateField(field: IField<YupValidateRules>): Promise<unknown> {
    const children =field.getSubFieldSchemas()||[]
    this.validateOneObject(field.getValue(), children)
    throw new Error("Method not implemented.");
  }

  private getRootFields(fieldSchemas: IFieldSchema<YupValidateRules>[]) {
    const children: IFieldSchema<YupValidateRules>[] = []
    for (const child of fieldSchemas) {
      if (child.path.indexOf(".") < 0) {
        children.push(child)
      }
    }

    return children
  }

  private getFieldChildren(field: IFieldSchema<YupValidateRules>, fieldSchemas: IFieldSchema<YupValidateRules>[]) {
    const children: IFieldSchema<YupValidateRules>[] = []
    for (const child of fieldSchemas) {
      if (field.path !== child.path &&
        child.path.startsWith(field.path) &&
        child.path.substring(field.path.length + 1).indexOf(".") > 0
      ) {
        children.push(child)
      }
    }
    return children
  }

  //校验一个对象
  private validateOneObject(value: unknown, fieldSchemas: IFieldSchema<YupValidateRules>[]) {
    throw new Error("Method not implemented.");
  }

}