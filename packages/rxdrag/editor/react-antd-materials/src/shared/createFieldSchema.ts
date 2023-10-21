import { FieldOptions } from "./SchemaOptions"

export function createFieldSchema(field: FieldOptions) {
  return field.fieldType
    ? [
      {
        componentName: "XDataInput",
        props: {
          hasRules: field.hasRules,
          fieldType: field.fieldType,
        },
        "x-data": {
          name: "x-data",
        },
      },
    ]
    : []
}