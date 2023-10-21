import { FieldOptions } from "./SchemaOptions"
import { attachFormItem } from "./attachFormItem"

export function createFieldSchema(field: FieldOptions) {
  const fieldDefineFields = [
    {
      componentName: "NameInput",
      "x-data": {
        name: "x-data.name",
        label: "$fieldName",
        //defaultValue: "",
      },
    },
    {
      componentName: "ValueInput",
      "x-data": {
        name: "x-data.defaultValue",
        label: "$defaultValue",
      },
    },
  ]
  return [
    ...attachFormItem(fieldDefineFields) || [],
    ...field.hasRules ? [{
      componentName: "YupRulesInput",
      "x-data": {
        name: "x-data.validateRules",
      },
    }] : []
  ]
}