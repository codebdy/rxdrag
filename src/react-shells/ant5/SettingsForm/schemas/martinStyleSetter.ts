import { INodeSchema } from "core";

export const martinStyleSetter: INodeSchema = {
  componentName: "Fold",
  "x-field": {
    type: "object",
    name: "style"
  },
  children: [
    {
      componentName: "FoldBase",
      props: {
        label: "$margin",
      },
      children: [
        {
          componentName: "MarginInput",
          "x-field": {
            name: "margin",
            virtual: true,
          }
        }
      ]
    },
    {
      componentName: "FoldExtra",
      children: [
        {
          componentName: "MarginTopInput",
          props: {
            title: "$marginTop",
          },
          "x-field": {
            name: "marginTop"
          }
        },
        {
          componentName: "MarginRightInput",
          props: {
            title: "$marginRight",
          },
          "x-field": {
            name: "marginRight"
          }
        },
        {
          componentName: "MarginLeftInput",
          props: {
            title: "$marginLeft",
          },
          "x-field": {
            name: "marginLeft"
          }
        },
        {
          componentName: "MarginBottomInput",
          props: {
            title: "$marginBottom",
          },
          "x-field": {
            name: "marginBottom"
          }
        },
      ]
    }
  ]
}