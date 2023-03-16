import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const routeToSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$fromInput",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "config.fromInput",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "URL",
      },
      children: [
        {
          componentName: "TextArea",
          "x-field": {
            name: `config.url`,
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}