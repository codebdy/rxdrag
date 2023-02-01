import { INodeSchema } from "core";

export const startNodeSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
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
}