import { attachFormItem } from "./attachFormItem"

export type FieldOptions = {
  canBindField?: boolean,
}

export function createFieldSchema(logicOptions?: FieldOptions) {
  const reactionFields = [
    {
      componentName: "ExpressionInput",
      "x-field": {
        name: "value",
        label: "$value",
      },
    }
  ]
  const reactionCollapse = [{
    componentName: "CollapsePanel",
    "x-field": {
      type: "object",
      name: "x-field.reactionProps",
    },
    props: {
      title: "$fieldReaction"
    },
    children: attachFormItem(reactionFields)
  }]

  const bindFields = [
    {
      componentName: "Switch",
      "x-field": {
        name: "withBind",
        label: "$withBind",
        params: {
          valuePropName: "checked",
        }
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "valuePropName",
        label: "$valuePropName",
      },
    },
  ]
  const bindCollapse = logicOptions?.canBindField
    ? [
      {
        componentName: "CollapsePanel",
        "x-field": {
          type: "object",
          name: "x-field.params",
        },
        props: {
          title: "$fieldBind"
        },
        children: attachFormItem(bindFields)
      },
    ]
    : []
  const fieldDefineFields = [
    {
      componentName: "Select",
      "x-field": {
        name: "x-field.type",
        label: "$fieldType",
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
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "x-field.name",
        label: "$fieldName",
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "x-field.defaultValue",
        label: "$defaultValue",
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "x-field.fragmentFields",
        label: "$fragmentFields",
      },
    },
    {
      componentName: "Input",
      "x-field": {
        name: "x-field.validateRules",
        label: "$validateRules",
      },
    }
  ]
  return [
    {
      componentName: "CollapsePanel",
      props: {
        title: "$fieldDefine",
      },
      children: attachFormItem(fieldDefineFields)
    },
    ...bindCollapse,
    ...reactionCollapse,
  ]
}