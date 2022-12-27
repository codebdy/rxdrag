import { INodeSchema } from "core";
import { borderRediusSetter } from "react-shells/ant5/SettingsForm/schemas/borderRediusSetter";
import { borderSetter } from "react-shells/ant5/SettingsForm/schemas/borderSetter";
import { displaySetter } from "react-shells/ant5/SettingsForm/schemas/displaySetter";
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
        title: "$style"
      },
      "x-field": {
        type: "object",
        name: "style"
      },
      children: [
        {
          componentName: "FormItem",
          props: {
            label: "$width",
          },
          children: [
            {
              componentName: "SizeInput",
              "x-field": {
                name: "width",
              },
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$height",
          },
          children: [
            {
              componentName: "SizeInput",
              "x-field": {
                name: "height",
              },
            }
          ]
        },
        displaySetter,
        {
          componentName: "FormItem",
          props: {
            label: "$background",
          },
          children: [
            {
              componentName: "ColorInput",
              "x-field": {
                name: "backgroundColor",
              },
            }
          ]
        },
        fontStyleSetter,
        martinStyleSetter,
        paddingStyleSetter,
        borderRediusSetter,
        borderSetter,
        {
          componentName: "FormItem",
          props: {
            label: "$opacity",
          },
          children: [
            {
              componentName: "Slider",
              "x-field": {
                name: "opacity",
              },
              props: {
                max: 1,
                step: 0.1,
                defaultValue: 1,
              }
            }
          ]
        },
      ]
    }
  ]
}