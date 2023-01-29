import { INodeSchema } from "core";

export const footerSchema: INodeSchema = {
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
            label: "$title",
          },
          "x-field": {
            name: "title",
          },
          children: [
            {
              componentName: "Input"
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$type",
          },
          "x-field": {
            name: "type",
          },
          children: [
            {
              componentName: "Select",
              props: {
                options: [
                  {
                    value: 'primary',
                    label: 'Primary',
                  },
                  {
                    value: 'ghost',
                    label: 'Ghost',
                  },
                  {
                    value: 'dashed',
                    label: 'Dashed',
                  },
                  {
                    value: 'link',
                    label: 'Link',
                  },
                  {
                    value: 'text',
                    label: 'Text',
                  },
                  {
                    value: 'default',
                    label: 'Default',
                  },
                ]
              }
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$disabled",
          },
          "x-field": {
            name: "disabled",
            params:{
              valuePropName: "checked",
            }
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