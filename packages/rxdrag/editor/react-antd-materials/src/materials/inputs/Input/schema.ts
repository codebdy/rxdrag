import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";
import { inputBaseSchemas } from "../schemas";

const inputPros = [
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

const inputSlots = [
  {
    name: "addonBefore",
    label: "$addonBefore",
  },
  {
    name: "addonAfter",
    label: "$addonAfter",
  },
  {
    name: "prefix",
    label: "$prefix",
  },
  {
    label: "$suffix",
    name: "suffix"
  },
]
const options: SchemaOptions = {
  propSchemas:inputPros,
  slotSchemas:inputSlots,
  field: {
    fieldType: "normal",
  },
}
export const inputSchema: INodeSchema = createSchema(options)

const textareaOptions: SchemaOptions = {
  propSchemas: [...inputPros,
  {
    componentName: "InputNumber",
    "x-data": {
      name: "rows",
      label: "$rows",
    },
  },
  ],
  field: {
    fieldType: "normal",
  },
}
export const textAreaSchema: INodeSchema = createSchema(textareaOptions)