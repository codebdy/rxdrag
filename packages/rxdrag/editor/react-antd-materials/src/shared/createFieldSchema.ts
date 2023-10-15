import { FieldOptions } from "./SchemaOptions"
import { attachFormItem } from "./attachFormItem"

export function createFieldSchema(field: FieldOptions) {
  const fieldDefineFields = [
    {
      componentName: "Input",
      "x-field": {
        name: "x-field.name",
        label: "$fieldName",
        //defaultValue: "",
      },
    },
    {
      componentName: "ValueInput",
      "x-field": {
        name: "x-field.defaultValue",
        label: "$defaultValue",
      },
    },
  ]
  return [
    ...attachFormItem(fieldDefineFields) || [],
    ...field.hasRules ? [{
      componentName: "YupRulesInput",
      "x-field": {
        name: "x-field.validateRules",
      },
    }] : []
  ]
}