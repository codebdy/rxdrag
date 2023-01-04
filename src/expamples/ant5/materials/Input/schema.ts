import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const inputSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$placeholder",
      },

      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "placeholder",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$disabled",
        valuePropName: "checked",
      },
      "x-field": {
        name: "disabled",
      },
      children: [
        {
          componentName: "Switch"
        }
      ]
    },
  ],
  [
    {
      componentName: "FormItem",
      props: {
        label: "$addonBefore",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "addonBefore"
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$addonAfter",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "addonAfter"
          }
        }
      ]
    },
  ]
)