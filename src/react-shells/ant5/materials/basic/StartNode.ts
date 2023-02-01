import { INodeSchema } from "core";

export const startNodeSchema: INodeSchema = {
  componentName: "Fragment",
  children: [
    {
      componentName: "FormItem",
      props: {
        label: "ID",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "id",
          },
          props:{
            disabled: true,
          }
        }
      ]
    },
    {
      componentName: "FormItem",
      props: {
        label: "$label",
      },
      children: [
        {
          componentName: "Input",
          "x-field": {
            name: "label",
          },
          props:{
            disabled: true,
          }
        }
      ]
    },
  ]
}