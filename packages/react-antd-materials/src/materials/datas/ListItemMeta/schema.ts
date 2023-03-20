import { INodeSchema } from "@rxdrag/schema";
import { createSchema, SchemaOptions } from "@rxdrag/react-antd-shell";

const options: SchemaOptions = {
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$avatar",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "avatar"
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$title",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "title"
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$description",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "description"
          }
        }
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)