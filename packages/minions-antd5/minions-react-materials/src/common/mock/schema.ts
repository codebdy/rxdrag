import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const mockSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$error",
      },
      children: [
        {
          componentName: "Switch",
          "x-data": {
            name: `config.isError`
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$duration",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: "config.duration"
          },
        }
      ]
    },
  ],
}