import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const formItemSchema: INodeSchema = createSchema([
  {
    componentName: "FormItem",
    props: {
      label: "$colon",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "colon",
          valuePropName: "checked",
        },
        props:{
          defaultChecked: true
        }
      },
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$label",
    },
    children: [
      {
        componentName: "Input",
        "x-field": {
          name: "label",
        },
      }
    ]
  },
])