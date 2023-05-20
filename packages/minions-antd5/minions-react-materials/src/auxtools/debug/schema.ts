import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const debugSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
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
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}