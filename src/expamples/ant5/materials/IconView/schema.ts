import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const iconViewSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$size",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "size",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$color",
      },
      children: [
        {
          componentName: "ColorInput",
          "x-field": {
            name: "color",
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
  ]
)