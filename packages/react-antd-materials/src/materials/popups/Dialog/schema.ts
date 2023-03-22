import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

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