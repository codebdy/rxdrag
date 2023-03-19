import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$shape",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "shape",
            params: {
              withBind: true,
            }
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$circle",
                value: "circle"
              },
              {
                label: "$square",
                value: "square"
              },
            ],
            defaultValue: "circle",
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$size",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "size",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
  ],
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$icon",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "icon"
          }
        }
      ]
    },
  ]
}

export const avatarSchema: INodeSchema = createSchema(options)