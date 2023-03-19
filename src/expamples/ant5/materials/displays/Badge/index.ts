import { Badge } from "antd";
import { IComponentMaterial } from "core-react";
import { BadgeDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Badge"
export const BadgeMaterial: IComponentMaterial = {
  componentName: name,
  component: Badge,
  designer: BadgeDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
        props:{
          count:5
        },
        children: [
          {
            componentName: "Avatar",
          }
        ]
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}