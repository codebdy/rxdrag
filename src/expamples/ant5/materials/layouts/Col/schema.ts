import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

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
          },
        }
      ]
    },
  ]
}

export const rowSchema: INodeSchema = createSchema(options)