export const INIT_EVENT_NAME = "init"
export const DESTORY_EVENT_NAME = "destory"

export type LogicOptions = {
  canBindField?: boolean,
}

export function createReactionSchema(logicOptions?: LogicOptions) {
  const bindCollapse = logicOptions?.canBindField
    ? [{
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
    },]
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
    {
      componentName: "CollapsePanel",
      props: {
        title: "$reactions"
      },
      children: [
        {
          componentName: "ReactionsInput",
          "x-field": {
            name: "x-reactions",
            params: {
              withBind: true,
            }
          },
          props: {
            title: "$controller",
            events: [
              {
                name: INIT_EVENT_NAME,
                label: "$init",
              },
              {
                name: DESTORY_EVENT_NAME,
                label: "$destory",
              },
              {
                name: "onClick",
                label: "$onClick",
              },
            ],
          },
        },
      ]
    },
  ]
}