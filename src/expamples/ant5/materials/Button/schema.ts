import { INodeSchema } from "core";
import { fontStyleSetter } from "react-shells/ant5/SettingsForm/schemas/fontStyleSetter";
import { martinStyleSetter } from "react-shells/ant5/SettingsForm/schemas/martinStyleSetter";
import { paddingStyleSetter } from "react-shells/ant5/SettingsForm/schemas/paddingStyleSetter";

export const buttonSchema: INodeSchema = {
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
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "title",
              },
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$type",
          },

          children: [
            {
              componentName: "Select",
              "x-field": {
                name: "type",
              },
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
          children: [
            {
              componentName: "Switch",
              "x-field": {
                name: "disabled",
                valuePropName: "checked",
              },
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
      "x-field": {
        type: "object",
        name: "style"
      },
      children: [
        fontStyleSetter,
        martinStyleSetter,
        paddingStyleSetter
      ]
    }
  ]
}