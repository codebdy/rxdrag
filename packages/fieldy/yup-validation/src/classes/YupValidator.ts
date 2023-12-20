import { IField, IFieldSchema, IForm, IValidationError, IValidator } from "@rxdrag/fieldy";
import { PredeinedValidators, YupType, IYupValidateSchema } from "../interfaces";
import { object, ValidationError, Schema, mixed, date, boolean, number } from 'yup';
import { predifinedValidators } from "../predefineds";
import { string } from "yup";
import { isStr } from "@rxdrag/shared"

export class YupValidator implements IValidator {
  predefinedValidators = predifinedValidators
  constructor(validators?: PredeinedValidators) {
    this.predefinedValidators = { ...this.predefinedValidators, ...validators }
  }

  validateForm(form: IForm<IYupValidateSchema>): Promise<unknown> {
    const schemas = form.getFieldSchemas()
    for (const fieldSchema of schemas) {
      if (fieldSchema.type === "object") {
        const field = form.getField(fieldSchema.path)
        this.validateOneObject(field?.getValue(), field?.getSubFieldSchemas() || [])
      }
    }
    return this.validateOneObject(form.getValue(), schemas)
  }

  validateField(field: IField<IYupValidateSchema>): Promise<unknown> {
    const children = field.getSubFieldSchemas() || []
    return this.validateOneObject(field.getValue(), children)
  }

  //校验一个对象
  private async validateOneObject(value: unknown, fieldSchemas: IFieldSchema<IYupValidateSchema>[]) {

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
          message: oneErr.message,
        })
      )

      throw returnErrors
    }
  }


  private parseRules(meta: IYupValidateSchema) {
    let schema: Schema = mixed()
    const typeValue = isStr(meta.type) ? meta.type : meta.type?.value
    if (typeValue) {
      const predefinedValidtor = this.predefinedValidators[typeValue]
      if (predefinedValidtor) {
        schema = predefinedValidtor((meta.type as any)?.message||"Not define type error message")
      } else if (typeValue === YupType.string) {
        schema = string()
      } else if (typeValue === YupType.date) {
        schema = date()
      } else if (typeValue === YupType.boolean) {
        schema = boolean()
      } else if (typeValue === YupType.number) {
        schema = number()
      }
    }

    if (meta.required) {
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