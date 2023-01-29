import { INodeSchema } from "core";

export const hCFLayoutSchema: INodeSchema = {
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
        title: "$properties",
        id: "propperties"
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
        title: "$style",
        id: "style"
      },
    },
    {
      componentName: "TabPanel",
      props: {
        title: "$slots",
        id: "slots",
      },
      children: [
        {
          componentName: "FormItem",
          props: {
            label: "$header",
          },
          children: [
            {
              componentName: "SlotSwitch",
              props: {
                name: "header"
              }
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$content",
          },
          children: [
            {
              componentName: "SlotSwitch",
              props: {
                name: "content"
              }
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$footer",
          },
          children: [
            {
              componentName: "SlotSwitch",
              props: {
                name: "footer"
              }
            }
          ]
        },
      ]
    }
  ]
}