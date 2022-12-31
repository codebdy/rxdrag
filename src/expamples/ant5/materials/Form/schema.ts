import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const formSchema: INodeSchema = createSchema([
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