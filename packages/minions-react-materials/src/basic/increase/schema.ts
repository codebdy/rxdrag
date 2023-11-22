import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const increaseSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$step",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: `config.step`,
          },
        }
      ]
    },
  ],
}