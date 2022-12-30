import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const avatarSchema: INodeSchema = createSchema(
  [
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
          },
        }
      ]
    },
  ],
  [
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
)