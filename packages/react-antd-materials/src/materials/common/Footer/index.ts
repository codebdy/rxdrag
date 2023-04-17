import { IComponentMaterial, DefaultSlot } from "@rxdrag/react-core";
import { locales } from "./locales";
import { slotSchema } from "./schema";

const name = "Footer"
export const FooterMaterial: IComponentMaterial = {
  componentName: name,
  component: DefaultSlot,
  designer: DefaultSlot,
  designerLocales: locales,
  propsSchema: slotSchema,
  behaviorRule: {
    draggable: false,
    droppable: true,
    deletable: false,
    cloneable: false
  },
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
        props: {
        }
      }
    ]
  },
}
