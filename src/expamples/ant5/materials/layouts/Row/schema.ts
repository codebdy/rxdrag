import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const rowSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$gutter",
      },
      children: [
        {
          componentName: "GutterInput",
          "x-field": {
            name: "gutter",
          },
        }
      ]
    },
  ]
)