import { INodeSchema } from "core";

export const startNodeSchemas: INodeSchema[] = [
  {
    componentName: "FormItem",
    props: {
      label: "$width",
    },
    children: [
      {
        componentName: "Input",
        "x-field": {
          name: "id",
        },
      }
    ]
  },
]