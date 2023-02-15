import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

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