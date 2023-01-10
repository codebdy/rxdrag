import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const staticSchema: INodeSchema = createSchema(
  [
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
        label: "$value",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "value",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$prefix",
      },
      children: [
        {
          componentName: "IconInput",
          "x-field": {
            name: "prefix",
          },
        }
      ]
    },
  ]
)