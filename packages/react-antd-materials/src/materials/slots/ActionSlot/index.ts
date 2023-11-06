import { IMaterial, DefaultSlot } from "@rxdrag/react-core";
import { locales } from "./locales";
import { slotSchema } from "./schema";

const name = "ActionSlot"
export const ActionSlotMaterial: IMaterial = {
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
