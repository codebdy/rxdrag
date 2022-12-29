import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const avatarSchema: INodeSchema = createSchema(
  [
    {
      componentName: "FormItem",
      props: {
        label: "$icon",
      },
      children: [
        {
          componentName: "IconInput",
          "x-field": {
            name: "icon",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$shape",
      },

      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "shape",
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
)