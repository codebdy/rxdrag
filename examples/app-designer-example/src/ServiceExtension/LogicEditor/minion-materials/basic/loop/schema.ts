import { INodeSchema } from "@rxdrag/schema";
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
          "x-data": {
            name: "config.fromInput",
            params:{
              valuePropName: "checked",
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$times",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-data": {
            name: "config.times",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}