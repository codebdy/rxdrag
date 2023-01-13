import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";
import { IFieldMeta } from "runtime/fieldy";
import { IReactionsMeta } from "runtime/reaction/interfaces";

const options: SchemaOptions<IFieldMeta, IReactionsMeta> = {
  propsSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$bordered",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "bordered",
            valuePropName: "checked",
          },
        }
      ],
    },
    {
      componentName: "FormItem",
      props: {
        label: "$split",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "split",
            valuePropName: "checked",
          },
        }
      ],
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
    }
  ],
  slotsSchemas: [
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
        },
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
        },
      ]
    },
  ],
  logicSchemas: [
    {
      componentName: "FormItem",
      props: {
        label: "$fieldType",
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
                value: '',
                label: '',
              },
              {
                value: 'normal',
                label: 'Normal',
              },
              {
                value: 'object',
                label: 'Object',
              },
              {
                value: 'array',
                label: 'Array',
              },
              {
                value: 'fragment',
                label: 'Fragment',
              },
            ]
          }
        }]
    }
  ]
}

export const materialSchema: INodeSchema = createSchema(options)