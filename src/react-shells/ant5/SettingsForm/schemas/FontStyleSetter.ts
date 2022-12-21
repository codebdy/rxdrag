import { INodeSchema } from "core";
import { fontWeightIcon } from "../components/FontStyleSetter/icons";



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
          props: {
          }
        }
      ]
    },
    {
      componentName: "FoldExtra",
      children: [
        {
          componentName: "FoldExtraItem",
          props: {
            title: "fontWeight",
            icon: fontWeightIcon
          }
        },
        {
          componentName: "FoldExtraItem",
          props: {
            title: "fontColor",
            span: 12
          },
          children: [
            {
              componentName: "ColorInput"
            }
          ]
        },
        {
          componentName: "FoldExtraItem",
          props: {
            title: "fontSize",
            span: 12
          },
          children: [
            {
              componentName: "SizeInput"
            }
          ]
        },
      ]
    }
  ]
}