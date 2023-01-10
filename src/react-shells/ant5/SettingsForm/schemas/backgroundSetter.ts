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
            title: "$backgroundImage",
            imageTitle: "$image",
            imageSizeTitle: "$imageSize",
            repeatTitle: "$repeat",
            positionTitle: "$position",
          },
          "x-field": {
            name: "backgroundImage"
          }
        },
      ]
    }
  ]
}