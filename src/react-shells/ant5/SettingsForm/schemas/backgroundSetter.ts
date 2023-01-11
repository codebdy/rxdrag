import { INodeSchema } from "core";
import { IFieldMeta } from "fieldy";

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
            name: "backgroundImage"
          }
        },
        {
          componentName: "BackgroundSizeInput",
          props: {
            title: "$imageSize",
            },
          "x-field": {
            name: "backgroundSize"
          }
        },
        {
          componentName: "BackgroundRepeatInput",
          props: {
            title: "$repeat",
          },
          "x-field": {
            name: "backgroundRepeat"
          }
        },
        {
          componentName: "BackgroundPositionInput",
          props: {
            title: "$position",
          },
          "x-field": {
            name: "backgroundPosition"
          }
        },
      ]
    }
  ]
}