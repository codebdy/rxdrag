import { FieldOptions } from "./SchemaOptions"

export function createFieldSchema(fieldOptions?: FieldOptions) {
  return fieldOptions?.fieldType
    ? [
      {
        componentName: "XDataInput",
        props: {
          fieldOptions,
        },
        "x-data": {
          name: "x-data",
        },
      },
    ]
    : []
}