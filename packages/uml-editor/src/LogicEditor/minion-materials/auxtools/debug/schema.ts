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
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.tip",
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
        label: "$close",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: `config.closed`,
            params: {
              valuePropName: "checked",
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}