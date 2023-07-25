import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { inputBaseSchemas } from "../schemas";

const mentionsNumberPros = [
  ...inputBaseSchemas,
  {
    componentName: "Switch",
    "x-field": {
      name: "showCount",
      label: "$showCount",
    },
  },
  {
    componentName: "InputNumber",
    "x-field": {
      name: "maxLength",
      label: "$maxLength",
    },
  },
]

const options: SchemaOptions = {
  propSchemas: mentionsNumberPros
}

export const inputNumberSchema: INodeSchema = createSchema(options)

