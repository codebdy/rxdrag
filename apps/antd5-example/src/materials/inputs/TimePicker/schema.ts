import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$disabled",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "disabled",
            params:{
              valuePropName: "checked",
              withBind: true,
            }
          },
        }
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)