import { INodeSchema } from "core";

import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

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