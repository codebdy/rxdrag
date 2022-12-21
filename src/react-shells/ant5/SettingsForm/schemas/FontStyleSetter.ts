import { INodeSchema } from "core";

export const FontStyleSetter: INodeSchema = {
  componentName: "Fold",
  children: [
    {
      componentName: "FoldBase",
      props: {
        label: "$font",
      },
      children: [
        {
          componentName: "FontSelect",
        }
      ]
    },
    {
      componentName: "FoldExtra",
      children: [
        {
          componentName: "FontWeightInput",
          props: {
            title: "fontWeight",
          }
        },
        {
          componentName: "FontColorInput",
          props: {
            title: "fontColor",
            span: 12
          },
        },
        {
          componentName: "FontSizeInput",
          props: {
            title: "fontSize",
            span: 12
          },
        },
        {
          componentName: "FontLineHeightInput",
          props: {
            title: "fontSize",
            span: 12
          },
        },
        {
          componentName: "FontLineHeightInput",
          props: {
            title: "TextAlignSelect",
          },
        },
        {
          componentName: "FontLineHeightInput",
          props: {
            title: "FontDecorationSelect",
          },
        },
      ]
    }
  ]
}