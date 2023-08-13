import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { PredeinedValidators, YupType, YupValidateMeta } from "../interfaces";
import { object, string, boolean, number, ValidationError, Schema } from 'yup';
import { predifinedValidators } from "../predefineds";

export class YupValidator implements IValidator {
  predefinedValidators = predifinedValidators
  constructor(validators?: PredeinedValidators) {
    this.predefinedValidators = { ...this.predefinedValidators, ...validators }
  }

  validateForm(form: IForm<YupValidateMeta>): Promise<unknown> {
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

  validateField(field: IField<YupValidateMeta>): Promise<unknown> {
    const children = field.getSubFieldSchemas() || []
    return this.validateOneObject(field.getValue(), children)
  }

  //校验一个对象
  private async validateOneObject(value: unknown, fieldSchemas: IFieldSchema<YupValidateMeta>[]) {

    const schemaConfig = {} as any;

    for (const field of fieldSchemas) {
      if (field.name && field.validateRules) {
        schemaConfig[field.name] = this.parseRules(field.validateRules)
      }
    }

    const schema = object().shape(schemaConfig);

    // let schema = object().shape({
    //   name: string().email(),
    //   age: number().min(18),
    // });

    try {
      const result = await schema.validate(value, { abortEarly: false });
      //const result = await schema.validate({ name: "12", age: 11 }, { abortEarly: false });
      return result;
    } catch (err: any) {
      console.log("===>validate inner", err.inner)
      throw err.inner
    }
  }


  private parseRules(meta: YupValidateMeta) {
    if (meta.type?.value) {
      const predefinedValidtor = this.predefinedValidators[meta.type?.value]
      let schema: Schema | undefined
      if (predefinedValidtor) {
        schema = predefinedValidtor(meta.type.message)
      } else if (meta.type?.value === YupType.string) {

      }

      if (schema) {
        if (meta.rules?.required) {
          schema = schema.required()
        }
        if (meta.rules?.test) {
          throw new Error("未实现校验规则 test")
        }
        if (meta.rules?.when) {
          throw new Error("未实现校验规则 when")
        }
      }

      return schema
    }
  }
}