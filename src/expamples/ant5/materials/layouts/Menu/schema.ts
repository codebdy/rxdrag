import { INodeSchema } from "core";
import { borderRediusSetter } from "react-shells/ant5/SettingsForm/schemas/borderRediusSetter";
import { borderSetter } from "react-shells/ant5/SettingsForm/schemas/borderSetter";
import { displaySetter } from "react-shells/ant5/SettingsForm/schemas/displaySetter";
import { fontStyleSetter } from "react-shells/ant5/SettingsForm/schemas/fontStyleSetter";
import { martinStyleSetter } from "react-shells/ant5/SettingsForm/schemas/martinStyleSetter";
import { paddingStyleSetter } from "react-shells/ant5/SettingsForm/schemas/paddingStyleSetter";

export const logoSchema: INodeSchema = {
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  valuePropName: "checked",
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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