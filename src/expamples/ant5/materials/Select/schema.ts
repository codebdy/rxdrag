import { INodeSchema } from "core";

export const selectSchema: INodeSchema = {
  componentName: "Tabs",
  props: {},
  "x-field": {
    type: "object",
    name: "props",
  },
  children: [
    {
      componentName: "TabPanel",
      props: {
        title: "$properties"
      },
      children: [
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
      ]
    },
    {
      componentName: "TabPanel",
      props: {
        title: "样式"
      },
    }
  ]
}