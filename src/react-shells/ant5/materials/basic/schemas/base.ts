import { INodeSchema } from "core";

export const nodeBaseSchema: INodeSchema = {
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
            readOnly: true,
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
          // props:{
          //   readOnly: true,
          // }
        }
      ]
    },
  ]
}