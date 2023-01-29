
export type LogicOptions = {
  canBindField?: boolean,
}

export function createReactionSchema(logicOptions?: LogicOptions) {
  const bindCollapse = logicOptions?.canBindField
    ? [{
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
            label: "$withBind",
          },
          children: [
            {
              componentName: "Switch",
              "x-field": {
                name: "withBind",
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
          },
          props: {
            title: "$controller",
            events: [
              {
                name: "init",
                label: "$init",
              },
              {
                name: "destory",
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