import { INodeSchema } from "core";
import { inputBaseSchemas } from "../schemas";
import { createSchema, SchemaOptions } from "react-shells/ant5/shared/createSchema";

const options: SchemaOptions = {
  propsSchemas: [
    ...inputBaseSchemas,
    {
      componentName: "FormItem",
      props: {
        label: "$mode",
      },

      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "mode",
            params: {
              withBind: true,
            }
          },
          props: {
            options: [
              {
                value: 'time',
                label: 'Time',
              },
              {
                value: 'date',
                label: 'Date',
              },
              {
                value: 'month',
                label: 'Month',
              },
              {
                value: 'year',
                label: 'Year',
              },
              {
                value: 'decade',
                label: 'Decade',
              },
            ]
          }
        },
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$mode",
      },
      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "picker",
            params: {
              withBind: true,
            }
          },
          props: {
            defaultValue: "year",
            options: [
              {
                value: 'date',
                label: 'Date',
              },
              {
                value: 'week',
                label: 'Week',
              },
              {
                value: 'month',
                label: 'Month',
              },
              {
                value: 'quarter',
                label: 'Quarter',
              },
              {
                value: 'year',
                label: 'Year',
              },
            ]
          }
        },
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$mode",
      },
      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "placement",
            params: {
              withBind: true,
            }
          },
          props: {
            defaultValue: "bottomLeft",
            options: [
              {
                value: 'bottomLeft',
                label: 'BottomLeft',
              },
              {
                value: 'bottomRight',
                label: 'BottomRight',
              },
              {
                value: 'topLeft',
                label: 'TopLeft',
              },
              {
                value: 'topRight',
                label: 'TopRight',
              },
            ]
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$format",
      },

      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "format",
            params: {
              withBind: true,
            }
          },
          props: {
            defaultValue: "YYYY-MM-DD"
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$showNow",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "showNow",
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
        label: "$showTime",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "showTime",
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
        label: "$showToday",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "showToday",
            params:{
              valuePropName: "checked",
              withBind: true,
            }
          },
          props: {
            defaultChecked: true,
          }
        }
      ]
    },
  ]
}

export const datePickerSchema: INodeSchema = createSchema(options)