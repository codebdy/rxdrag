import { INodeSchema } from "core";
import { IFieldMeta } from "runner/fieldy";

export const backgroundSetter: INodeSchema<IFieldMeta> = {
  componentName: "Fold",
  children: [
    {
      componentName: "FoldBase",
      props: {
        title: "$background",
      },
      children: [
        {
          componentName: "ColorInput",
          "x-field": {
            name: "backgroundColor",
            params: {
              withBind: true,
            }
          },
        }
      ]
    },
    {
      componentName: "FoldExtra",
      children: [
        {
          componentName: "BackgroundImageInput",
          props: {
            title: "$image",
          },
          "x-field": {
            name: "backgroundImage",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "BackgroundSizeInput",
          props: {
            title: "$imageSize",
            },
          "x-field": {
            name: "backgroundSize",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "BackgroundRepeatInput",
          props: {
            title: "$repeat",
          },
          "x-field": {
            name: "backgroundRepeat",
            params: {
              withBind: true,
            }
          }
        },
        {
          componentName: "BackgroundPositionInput",
          props: {
            title: "$position",
          },
          "x-field": {
            name: "backgroundPosition",
            params: {
              withBind: true,
            }
          }
        },
      ]
    }
  ]
}