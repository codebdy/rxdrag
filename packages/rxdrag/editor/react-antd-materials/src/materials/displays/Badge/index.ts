import { IMaterial } from "@rxdrag/react-core";
import { Badge } from "antd";
import { BadgeDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Badge"
export const BadgeMaterial: IMaterial = {
  componentName: name,
  component: Badge,
  designer: BadgeDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
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