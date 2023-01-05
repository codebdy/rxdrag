import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";
import { inputBaseSchemas } from "../schemas";

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
          valuePropName: "checked",
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


export const inputNumberSchema: INodeSchema = createSchema(
  mentionsNumberPros,
)

