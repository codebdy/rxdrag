import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const delaySchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$time",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: `config.time`,
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}