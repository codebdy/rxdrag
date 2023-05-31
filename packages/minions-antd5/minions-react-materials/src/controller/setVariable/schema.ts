import { INodeSchema } from "@rxdrag/schema";

export const variableSchema: INodeSchema = {
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
            name: "config.param",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}