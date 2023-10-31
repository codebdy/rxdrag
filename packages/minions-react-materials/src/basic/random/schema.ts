import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const randomSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$minValue",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: `config.minValue`
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$maxValue",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: `config.maxValue`
          },
        }
      ]
    },
  ],
}