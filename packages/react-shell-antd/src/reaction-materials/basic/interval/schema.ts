import { INodeSchema } from "core";
import { labelSchema } from "../../baseSchema";

export const intervalSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$interval",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: `config.interval`,
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}