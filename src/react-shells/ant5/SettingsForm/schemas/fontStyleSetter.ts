import { INodeSchema } from "core";
import { IFieldMeta } from "runner/fieldy";

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
            name: "fontFamily",
            params: {
              withBind: true,
            }
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
            name: "fontWeight",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "FontStyleSelect",
          props: {
            title: "$fontStyle",
          },
          "x-field": {
            name: "fontStyle",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "FontColorInput",
          props: {
            title: "$fontColor",
            span: 24
          },
          "x-field": {
            name: "color",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "FontSizeInput",
          props: {
            title: "$fontSize",
            span: 12
          },
          "x-field": {
            name: "fontSize",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "FontLineHeightInput",
          props: {
            title: "$fontLineHeight",
            span: 12
          },
          "x-field": {
            name: "lineHeight",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "TextAlignSelect",
          props: {
            title: "$textAlign",
          },
          "x-field": {
            name: "textAlign",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "FontDecorationSelect",
          props: {
            title: "$fontDecoration",
          },
          "x-field": {
            name: "textDecoration",
            params: {
              withBind: true,
            }
          }
        },
      ]
    }
  ]
}