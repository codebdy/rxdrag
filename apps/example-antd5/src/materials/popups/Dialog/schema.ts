import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "@rxdrag/react-antd-shell";
const options: SchemaOptions = {
  propsSchemas: [],
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$footer",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "footer"
          }
        }
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)