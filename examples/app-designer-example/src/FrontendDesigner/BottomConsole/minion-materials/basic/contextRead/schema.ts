import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const contextReadSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$name",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: `config.name`,
            params: {
              withBind: true,
            }
          },
        }
      ]
    }
  ],
}