import { INodeSchema } from "core";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";
import { IBindParams } from "runner/ComponentRender/interfaces";
import { IFieldMeta } from "runner/fieldy";
import { IReactionsMeta } from "runner/reaction/interfaces";

const options: SchemaOptions<IFieldMeta<IBindParams>, IReactionsMeta> = {
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
            params: {
              valuePropName: "checked",
            }
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
            params: {
              valuePropName: "checked",
            }
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
      componentName: "CollapsePanel",
      props: {
        title: "$fieldDefine",
      },
      children: [
        {
          componentName: "FormItem",
          props: {
            label: "$fieldType",
          },
          children: [
            {
              componentName: "Select",
              "x-field": {
                name: "x-field.type",
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
        },
        {
          componentName: "FormItem",
          props: {
            label: "$fieldName",
          },
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "x-field.name",
              },
            }]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$defaultValue",
          },
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "x-field.defaultValue",
              },
            }]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$fragmentFields",
          },
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "x-field.fragmentFields",
              },
            }]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$validateRules",
          },
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "x-field.validateRules",
              },
            }]
        },
      ]
    },
    {
      componentName: "CollapsePanel",
      "x-field": {
        name: "x-field.params",
      },
      props: {
        title: "$fieldBind"
      },
      children: [
        {
          componentName: "FormItem",
          props: {
            label: "$windBind",
          },
          children: [
            {
              componentName: "Switch",
              "x-field": {
                name: "windBind",
                params: {
                  valuePropName: "checked",
                }
              },
            }
          ]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$valuePropName",
          },
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "valuePropName",
              },
            }]
        },
        {
          componentName: "FormItem",
          props: {
            label: "$trigger",
          },
          children: [
            {
              componentName: "Input",
              "x-field": {
                name: "trigger",
              },
            }]
        },
      ]
    },
    {
      componentName: "CollapsePanel",
      props: {
        title: "$reactions"
      },
      children: [
        {
          componentName: "FormItem",
          props: {
            label: "$controller",
          },
          children: [
            {
              componentName: "ReactionsInput",
              "x-field": {
                name: "x-reactions",
              },
              props: {
                title: "$configReactions"
              }
            }]
        },
      ]
    },
  ]
}

export const materialSchema: INodeSchema = createSchema(options)