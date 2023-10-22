import { labelSchema } from "@rxdrag/minions-react-materials";
import { INodeSchema } from "@rxdrag/schema";

export const schema: INodeSchema = {
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