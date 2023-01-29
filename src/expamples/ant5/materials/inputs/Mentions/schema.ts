import { INodeSchema } from "core";
import { inputBaseSchemas } from "../schemas";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const mentionsNumberPros = [
  ...inputBaseSchemas,
  {
    componentName: "FormItem",
    props: {
      label: "$showCount",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "showCount",
          params:{
            params:{
              valuePropName: "checked",
            }
          }
        },
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$maxLength",
    },
    children: [
      {
        componentName: "InputNumber",
        "x-field": {
          name: "maxLength",
        },
      }
    ]
  },
]

const options: SchemaOptions = {
  propsSchemas:mentionsNumberPros
}

export const inputNumberSchema: INodeSchema = createSchema(options)

