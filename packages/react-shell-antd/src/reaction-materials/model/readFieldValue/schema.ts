import { INodeSchema } from "@rxdrag/schema";
import { labelSchema } from "../../baseSchema";

export const readFieldValueSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$field",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "config.fieldPath",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },

  ],
}