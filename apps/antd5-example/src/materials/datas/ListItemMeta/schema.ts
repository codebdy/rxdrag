import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd/shared/createSchema";

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