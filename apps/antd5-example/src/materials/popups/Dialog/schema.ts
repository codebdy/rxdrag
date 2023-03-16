import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd/shared/createSchema";
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