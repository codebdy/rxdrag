import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const maretialSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$value",
      },
      children: [
        {
          componentName: "ImageInput",
          "x-field": {
            name: "value",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$height",
      },
      children: [
        {
          componentName: "SizeInput",
          "x-field": {
            name: "height",
          },
          props:{
            exclude:["inherit", "auto"]
          }
        }
      ]
    },
  ]
)