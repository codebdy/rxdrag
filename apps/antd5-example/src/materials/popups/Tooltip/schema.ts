import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "@rxdrag/react-shell-antd/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$placement",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "placement",
            params: {
              withBind: true,
            }
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$right",
                value: "right"
              },
              {
                label: "$left",
                value: "left"
              },
              {
                label: "$top",
                value: "top"
              },
              {
                label: "$bottom",
                value: "bottom"
              },
            ],
            defaultValue: "right",
          }
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
export const materialSchema: INodeSchema = createSchema(options)