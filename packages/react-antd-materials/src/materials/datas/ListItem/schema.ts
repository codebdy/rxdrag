import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "@rxdrag/react-antd-shell";

const options: SchemaOptions = {
  slotsSchemas:  [
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