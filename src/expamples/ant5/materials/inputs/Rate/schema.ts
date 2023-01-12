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
            valuePropName: "checked",
          },
        }
      ]
    },
  ]
}
export const materialSchema: INodeSchema = createSchema(options)