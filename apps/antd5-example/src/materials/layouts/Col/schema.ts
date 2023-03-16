import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
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