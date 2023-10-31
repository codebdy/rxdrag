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
          "x-data": {
            name: "config.fromInput"
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
          "x-data": {
            name: `config.url`
          },
        }
      ]
    },
  ],
}