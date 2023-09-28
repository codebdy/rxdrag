import { Space } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { SpaceDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Space"
export const SpaceMaterial: IMaterial = {
  componentName: name,
  component: Space,
  designer: SpaceDesigner,
  designerLocales: locales,
  propsSchema: schema,
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
