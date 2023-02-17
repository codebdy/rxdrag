import { Space } from "antd";
import { IComponentMaterial } from "core-react";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Space"
export const SpaceMaterial: IComponentMaterial = {
  componentName: name,
  component: Space,
  designer: Space,
  designerLocales: locales,
  designerSchema: schema,
  resource: {
    name: name,
    icon: icon,
    color: "#0EDB77",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
        props: {
        }
      }
    ]
  },
  behaviorRule:{
    noRef: true,
    droppable: true,
    noPlaceholder: false,
  }
}
