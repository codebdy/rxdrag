import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const fieldSchema: INodeSchema = createSchema(
  [
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
          },
        }
      ]
    },
  ],
  [
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
)