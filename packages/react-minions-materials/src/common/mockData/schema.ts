import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const mockDataSchema: INodeSchema = {
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
          "x-field": {
            name: `config.isError`,
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
        label: "$duration",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "config.duration",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
}