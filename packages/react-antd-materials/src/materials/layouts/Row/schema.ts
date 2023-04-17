import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propsSchemas: [
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
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ]
}

export const rowSchema: INodeSchema = createSchema(options)