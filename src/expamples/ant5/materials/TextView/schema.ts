import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const textViewSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$content",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "content",
          },
        }
      ]
    },
  ]
)