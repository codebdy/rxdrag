import { INodeSchema } from "@rxdrag/schema";
import { SchemaOptions, createSchema } from "../../../shared";

const options: SchemaOptions = {
  propSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$label",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "label",
            withBind: true,
          },
        }
      ]
    },
  ],
  slotSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$input",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "input"
          }
        }
      ]
    },
  ]
}

export const fieldSchema: INodeSchema = createSchema(options)