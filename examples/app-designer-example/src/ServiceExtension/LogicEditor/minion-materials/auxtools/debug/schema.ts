import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const debugSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$tip",
      },
      "x-field": {
        name: "config.tip",
      },
      children: [
        {
          componentName: "Input",
        }
      ]
    },    
    {
      componentName: "FormItem",
      props: {
        label: "$close",
      },
      "x-field": {
        name: `config.closed`,
      },
      children: [
        {
          componentName: "Switch",
        }
      ]
    },
  ],
}