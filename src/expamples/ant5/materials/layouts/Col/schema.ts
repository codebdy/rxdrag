import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const rowSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$span",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "span",
          },
        }
      ]
    },
  ]
)