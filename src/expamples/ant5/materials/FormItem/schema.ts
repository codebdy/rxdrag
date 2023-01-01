import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const formItemSchema: INodeSchema = createSchema([
  {
    componentName: "FormItem",
    props: {
      label: "$colon",
      valuePropName: "checked",
    },
    "x-field": {
      name: "colon",
    },
    children: [
      {
        componentName: "Switch"
      }
    ]
  },
])