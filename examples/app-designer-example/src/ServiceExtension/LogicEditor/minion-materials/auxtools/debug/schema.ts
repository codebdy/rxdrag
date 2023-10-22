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
      "x-data": {
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
      "x-data": {
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