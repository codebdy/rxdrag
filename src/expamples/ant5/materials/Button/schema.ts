import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy/interfaces";

const options: SchemaOptions<IFieldMeta<IBindParams>> = {
  propsSchemas: [
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
            params:{
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
            params:{
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
            params:{
              valuePropName: "checked",
              withBind: true,
            }
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
            params:{
              valuePropName: "checked",
              withBind: true,
            }
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
            params:{
              valuePropName: "checked",
              withBind: true,
            }
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
            params:{
              valuePropName: "checked",
              withBind: true,
            }
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
            withBind: true,
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
            withBind: true,
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
  ],
  slotsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$icon",
      },
      children: [
        {
          componentName: "SlotSwitch",
          props: {
            name: "icon"
          }
        }
      ]
    },
  ]
}

export const buttonSchema: INodeSchema = createSchema(options)