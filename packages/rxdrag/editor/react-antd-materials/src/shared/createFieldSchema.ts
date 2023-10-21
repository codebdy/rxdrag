import { FieldOptions } from "./SchemaOptions"

export function createFieldSchema(field: FieldOptions) {
  return field.hasField
    ? [
      {
        componentName: "XDataInput",
        props: {
          hasRules: field.hasRules
        },
        "x-data": {
          name: "x-data",
        },
      },
    ]
    : []
}