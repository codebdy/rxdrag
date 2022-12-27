import { INodeSchema } from "core";
import { IFieldMeta } from "fieldy";

export const fontStyleSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "FoldBase",
      props: {
        title: "$font",
      },
      children: [
        {
          componentName: "FontSelect",
          "x-field": {
            name: "fontFamily"
          }
        }
      ]
    },
    {
      componentName: "FoldExtra",
      children: [
        {
          componentName: "FontWeightInput",
          props: {
            title: "$fontWeight",
          },
          "x-field": {
            name: "fontWeight"
          }
        },
        {
          componentName: "FontStyleSelect",
          props: {
            title: "$fontStyle",
          },
          "x-field": {
            name: "fontStyle"
          }
        },
        {
          componentName: "FontColorInput",
          props: {
            title: "$fontColor",
            span: 24
          },
          "x-field": {
            name: "color"
          }
        },
        {
          componentName: "FontSizeInput",
          props: {
            title: "$fontSize",
            span: 12
          },
          "x-field": {
            name: "fontSize"
          }
        },
        {
          componentName: "FontLineHeightInput",
          props: {
            title: "$fontLineHeight",
            span: 12
          },
          "x-field": {
            name: "lineHeight"
          }
        },
        {
          componentName: "TextAlignSelect",
          props: {
            title: "$textAlign",
          },
          "x-field": {
            name: "textAlign"
          }
        },
        {
          componentName: "FontDecorationSelect",
          props: {
            title: "$fontDecoration",
          },
          "x-field": {
            name: "textDecoration"
          }
        },
      ]
    }
  ]
}