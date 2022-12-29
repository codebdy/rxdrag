import { INodeSchema } from "core";
import { createSchema } from "react-shells/ant5/shared/createSchema";

export const buttonSchema: INodeSchema = createSchema(
  [
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
    {
      componentName: "FormItem",
      props: {
        label: "$block",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "block",
            valuePropName: "checked",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$danger",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "danger",
            valuePropName: "checked",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$ghost",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "ghost",
            valuePropName: "checked",
          },
        }
      ]
    },
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
          componentName: "Radio.Group",
          "x-field": {
            name: "shape",
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$default",
                value: "default"
              },
              {
                label: "$circle",
                value: "circle"
              },
              {
                label: "$round",
                value: "round"
              },
            ],
            defaultValue: "default",
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$size",
      },
      children: [
        {
          componentName: "Radio.Group",
          "x-field": {
            name: "size",
          },
          props: {
            optionType: "button",
            options: [
              {
                label: "$large",
                value: "large"
              },
              {
                label: "$middle",
                value: "middle"
              },
              {
                label: "$small",
                value: "small"
              },
            ],
            defaultValue: "middle",
          }
        }
      ]
    },
  ]
)