import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { PredeinedValidators, YupType, YupValidateMeta } from "../interfaces";
import { object, string, boolean, number, ValidationError, Schema, mixed } from 'yup';
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

    try {
      const result = await schema.validate(value, { abortEarly: false });
      return result;
    } catch (err: any) {
      const errors = err.inner as ValidationError[]
      const returnErrors: IValidationError[] = errors.map(
        oneErr => ({
          path: fieldSchemas.find(field => field.name === oneErr.path)?.path || oneErr.path || "##no path##",
          messages: oneErr.message,
        })
      )

      console.log("===>validate inner", returnErrors)
      throw returnErrors
    }
  }


  private parseRules(meta: YupValidateMeta) {
    let schema: Schema = mixed()
    if (meta.type?.value) {
      const predefinedValidtor = this.predefinedValidators[meta.type?.value]
      if (predefinedValidtor) {
        schema = predefinedValidtor(meta.type.message)
      } else if (meta.type?.value === YupType.string) {
        throw new Error("未实现校验类型 string")
      } else if (meta.type?.value === YupType.date) {
        throw new Error("未实现校验类型 date")
      } else if (meta.type?.value === YupType.boolean) {
        throw new Error("未实现校验类型 boolean")
      } else if (meta.type?.value === YupType.number) {
        throw new Error("未实现校验类型 number")
      }
    }

    if (meta.rules?.required) {
      schema = schema.required()
    }
    if (meta.rules?.test) {
      throw new Error("未实现校验规则 test")
    }
    if (meta.rules?.when) {
      throw new Error("未实现校验规则 when")
    }

    return schema
  }
}