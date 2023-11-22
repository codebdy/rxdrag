import { IMaterial } from "@rxdrag/react-core";
import { locales, resourceLocales } from "./locales";
import { PagePlaceholder } from "./PagePlaceholder";
import { pageIcon } from "./icon";

const name = "Page"
export const PageMaterial: IMaterial = {
  componentName: "Page",
  component: PagePlaceholder,
  designer: PagePlaceholder,
  //propsSchema: paeSchema,
  designerLocales: locales,
  resource: {
    name: name,
    icon: pageIcon,
    color: "#8B572A",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    cloneable: false,
    draggable: false,
  }
}