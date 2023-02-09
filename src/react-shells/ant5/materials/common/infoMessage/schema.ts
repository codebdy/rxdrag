import { INodeSchema } from "core";
import { labelSchema } from "../../baseSchema";

export const infoMessageSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    labelSchema,
    {
      componentName: "FormItem",
      props: {
        label: "$type",
      },
      children: [
        {
          componentName: "Select",
          "x-field": {
            name: "config.type",
          },
          props: {
            options: [
              {
                value: 'success',
                label: '$success',
              },
              {
                value: 'error',
                label: '$error',
              },
              {
                value: 'info',
                label: '$info',
              },
              {
                value: 'warning',
                label: '$warning',
              },
              // {
              //   value: 'Loading',
              //   label: '$loading',
              // },
            ]
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$fromInput",
      },
      children: [
        {
          componentName: "Switch",
          "x-field": {
            name: "config.fromInput",
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
        label: "$message",
      },
      children: [
        {
          componentName: "TextArea",
          "x-field": {
            name: "config.message",
          },
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$duration",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "config.duration",
          },

        }
      ]
    },

  ],
}