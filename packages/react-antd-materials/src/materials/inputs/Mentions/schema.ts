import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { inputBaseSchemas } from "../schemas";

const mentionsNumberPros = [
  ...inputBaseSchemas,
  {
    componentName: "Switch",
    "x-data": {
      name: "showCount",
      label: "$showCount",
    },
  },
  {
    componentName: "InputNumber",
    "x-data": {
      name: "maxLength",
      label: "$maxLength",
    },
  },
]

const options: SchemaOptions = {
  propSchemas: mentionsNumberPros
}

export const inputNumberSchema: INodeSchema = createSchema(options)

