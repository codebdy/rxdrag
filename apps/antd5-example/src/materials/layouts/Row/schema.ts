import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd/shared/createSchema";

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