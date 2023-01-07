import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const materialSchema: INodeSchema = createSchema([
  {
    componentName: "FormItem",
    props: {
      label: "$title",
    },
    children: [
      {
        componentName: "Input",
        "x-field": {
          name: "title",
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
  {
    componentName: "FormItem",
    props: {
      label: "$icon",
    },
    children: [
      {
        componentName: "IconInput",
        "x-field": {
          name: "icon",
        },
      }
    ]
  },
])