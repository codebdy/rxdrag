import { IMaterial } from "@rxdrag/react-core";
import { locales, resourceLocales } from "./locales";
import { containerIcon } from "./icon";
import { Container } from "../../../components";
import { schema } from "./schema";

const name = "Container"
export const ContainerMaterial: IMaterial = {
  componentName: name,
  component: Container,
  designer: Container,
  propsSchema: schema,
  designerLocales: locales,
  resource: {
    name: name,
    icon: containerIcon,
    color: "#8B572A",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    //noPlaceholder: true,
    cloneable: false,
    draggable: false,
  }
}