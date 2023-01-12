import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const materialSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$count",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "count",
          },
        }
      ],
    },

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
  [
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
)