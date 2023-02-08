import { INodeSchema } from "core";
import { labelSchema } from "../../baseSchema";

export const loopSchema: INodeSchema = {
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
          },
        }
      ]
    },
  ],
}