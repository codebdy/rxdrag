import { IMaterial } from "@rxdrag/react-core";
import { objectIcon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { boxSchema } from "./schema";
import { ObjectContainer } from "@rxdrag/react-antd-components"


const name = "ObjectContainer"
export const ObjectContainerMaterial: IMaterial = {
  componentName: name,
  component: ObjectContainer,
  designer: ObjectContainer,
  designerLocales: locales,
  propsSchema: boxSchema,
  resource: {
    name: name,
    icon: objectIcon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  }
}
