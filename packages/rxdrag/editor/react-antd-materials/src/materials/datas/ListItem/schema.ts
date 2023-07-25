import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "../../..";

const options: SchemaOptions = {
  slotSchemas:  [
    {
      componentName: "FormItem",
      props: {
        label: "$actions",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "actions"
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$extra",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "extra"
          }
        }
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)