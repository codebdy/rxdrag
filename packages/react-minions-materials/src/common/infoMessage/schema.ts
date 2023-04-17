import { INodeSchema } from "@rxdrag/schema";
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
            params: {
              withBind: true,
            }
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
        label: "$duration",
      },
      children: [
        {
          componentName: "InputNumber",
          "x-field": {
            name: "config.duration",
            params: {
              withBind: true,
            }
          },

        }
      ]
    },

  ],
}