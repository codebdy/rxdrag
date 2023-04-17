export type FieldOptions = {
  canBindField?: boolean,
}

export function createFieldSchema(logicOptions?: FieldOptions) {
  const reactionCollapse = [{
    componentName: "CollapsePanel",
    "x-field": {
      type: "object",
      name: "x-field.reaction",
    },
    props: {
      title: "$fieldReaction"
    },
    children: [
      {
        componentName: "FormItem",
        props: {
          label: "$withBind",
        },
        children: [
          {
            componentName: "Switch",
            "x-field": {
              name: "withBind",
              params: {
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
          label: "$valuePropName",
        },
        children: [
          {
            componentName: "Input",
            "x-field": {
              name: "valuePropName",
              params: {
                withBind: true,
              }
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
              params: {
                withBind: true,
              }
            },
          }]
      },
    ]
  }]
  const bindCollapse = logicOptions?.canBindField
    ? [
      {
        componentName: "CollapsePanel",
        "x-field": {
          type: "object",
          name: "x-field.params",
          params: {
            withBind: true,
          }
        },
        props: {
          title: "$fieldBind"
        },
        children: [
          {
            componentName: "FormItem",
            props: {
              label: "$withBind",
            },
            children: [
              {
                componentName: "Switch",
                "x-field": {
                  name: "withBind",
                  params: {
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
              label: "$valuePropName",
            },
            children: [
              {
                componentName: "Input",
                "x-field": {
                  name: "valuePropName",
                  params: {
                    withBind: true,
                  }
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
                  params: {
                    withBind: true,
                  }
                },
              }]
          },
        ]
      },
    ]
    : []
  return [
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
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
                params: {
                  withBind: true,
                }
              },
            }]
        },
      ]
    },
    ...bindCollapse,
    ...reactionCollapse,
  ]
}