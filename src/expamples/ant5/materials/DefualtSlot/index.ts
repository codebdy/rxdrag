import { IComponentMaterial } from "core-react";
import { slotLocales } from "./locales";
import { slotSchema } from "./schema";
import { DefaultSlot } from "core-react/DefaultSlot";

const name = "DefaultSlot"
export const DefaultSlotMaterial: IComponentMaterial = {
  componentName: name,
  component: DefaultSlot,
  designer: DefaultSlot,
  designerLocales: slotLocales,
  designerSchema: slotSchema,
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
