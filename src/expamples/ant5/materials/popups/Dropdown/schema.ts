import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const materialSchema: INodeSchema = createSchema([
  {
    componentName: "FormItem",
    props: {
      label: "$arrow",
    },
    children: [
      {
        componentName: "Switch",
        "x-field": {
          name: "arrow",
          valuePropName: "checked",
        },
      }
    ]
  },
  {
    componentName: "FormItem",
    props: {
      label: "$trigger",
    },
    children: [
      {
        componentName: "Radio.Group",
        "x-field": {
          name: "trigger",
        },
        props: {
          optionType: "button",
          options: [
            {
              label: "$click",
              value: "click"
            },
            {
              label: "$hover",
              value: "hover"
            },
            {
              label: "$contextMenu",
              value: "contextMenu"
            },
          ],
          defaultValue: "click",
        }
      }
    ]
  },
])