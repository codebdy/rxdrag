import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const datePickerSchema: INodeSchema = createSchema([
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
  {
    componentName: "FormItem",
    props: {
      label: "$disabled",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "disabled",
          valuePropName: "checked",
        },
      }
    ]
  },
])