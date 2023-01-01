import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const formSchema: INodeSchema = createSchema([
  {
    componentName: "FormItem",
    props: {
      label: "$colon",
    },
    children: [
      {
        "x-field": {
          name: "colon",
          valuePropName: "checked",
        },
        componentName: "Switch",
        props:{
          defaultChecked: true,
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$layout",
    },
    children: [
      {
        componentName: "Select",
        "x-field": {
          name: "layout",
        },
        props: {
          options: [
            {
              label: "Horizontal",
              value: "horizontal"
            },
            {
              label: "Vertical",
              value: "vertical"
            },
            {
              label: "Inline",
              value: "inline"
            },
          ],
          defaultValue: "horizontal",
        }
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$disabled",
    },
    children: [
      {
        "x-field": {
          name: "disabled",
          valuePropName: "checked",
        },
        componentName: "Switch"
      }
    ]
  },
]
)