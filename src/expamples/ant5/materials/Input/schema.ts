import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const inputSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$placeholder",
      },
      "x-field": {
        name: "placeholder",
      },
      children: [
        {
          componentName: "Input"
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$disabled",
        valuePropName: "checked",
      },
      "x-field": {
        name: "disabled",
      },
      children: [
        {
          componentName: "Switch"
        }
      ]
    },
  ]
)