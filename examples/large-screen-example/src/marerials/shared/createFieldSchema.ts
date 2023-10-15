import { INodeSchema } from "@rxdrag/schema"
import { attachFormItem } from "./attachFormItem"
import { IFieldMeta } from "@rxdrag/fieldy"
import { IControllerMeta } from "@rxdrag/minions-runtime-react"

export interface IExpressionField {
  label: string,
  name: string,
  valueInputSchema: INodeSchema<IFieldMeta, IControllerMeta>,
}

export function transformExpressionField(expFields: IExpressionField[]) {
  return expFields.map(expField => {
    return {
      componentName: "FormItem",
      props: {
        label: expField.label,
      },
      "x-field": {
        type: "object",
        name: expField.name,
      },
      children: [
        {
          componentName: "div",
          props: {
            style: {
              display: "flex",
              alignItems: "center",
            }
          },
          children: [
            expField.valueInputSchema,
            {
              componentName: "ExpressionInput",
              props: {
                style: {
                  marginLeft: 8,
                }
              },
              "x-field": {
                name: "expression",
              },
            }
          ]
        }
      ]
    }
  })
}

export function createFieldSchema() {

  const validationCollapse = [{
    componentName: "CollapsePanel",
    props: {
      title: "$validation"
    },
    children: [
      {
        componentName: "YupRulesInput",
        "x-field": {
          name: "x-field.validateRules",
        },
      }
    ]
  }]


  const fieldDefineFields = [
    {
      componentName: "Select",
      "x-field": {
        name: "x-field.type",
        label: "$fieldType",
      },
      props: {
        allowClear: true,
        options: [
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
      componentName: "ValueInput",
      "x-field": {
        name: "x-field.defaultValue",
        label: "$defaultValue",
      },
    },
  ]
  return [
    {
      componentName: "CollapsePanel",
      props: {
        title: "$fieldDefine",
        //defaultExpand: true,
      },
      children: attachFormItem(fieldDefineFields)
    },
    ...validationCollapse,
  ]
}