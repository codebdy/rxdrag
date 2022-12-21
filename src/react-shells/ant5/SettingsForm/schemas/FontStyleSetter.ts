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
          componentName: "FontStyleSelect",
          props: {
            title: "fontStyle",
          }
        },
        {
          componentName: "FontColorInput",
          props: {
            title: "fontColor",
            span: 24
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
            title: "fontLineHeight",
            span: 12
          },
        },
        {
          componentName: "TextAlignSelect",
          props: {
            title: "textAlign",
          },
        },
        {
          componentName: "FontDecorationSelect",
          props: {
            title: "fontDecoration",
          },
        },
      ]
    }
  ]
}