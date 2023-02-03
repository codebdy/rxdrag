import { INodeSchema } from "core";

export const setVariableSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    {
      componentName: "FormItem",
      props: {
        label: "$variable",
      },
      children: [
        {
          componentName: "VariableSelect",
          "x-field": {
            name: "config.variable",
          },
        }
      ]
    },
  ],
}