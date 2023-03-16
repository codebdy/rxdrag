import { IComponentMaterial } from "core-react";
import { Space } from "expamples/ant5/components/layouts/Space";
import { SpaceDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Space"
export const SpaceMaterial: IComponentMaterial = {
  componentName: name,
  component: Space,
  designer: SpaceDesigner,
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
        },
        selfRender: true,
      }
    ]
  },
  behaviorRule: {
    noRef: true,
    droppable: true,
    noPlaceholder: false,
  }
}
