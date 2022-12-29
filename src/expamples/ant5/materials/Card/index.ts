import { IComponentMaterial } from "core-react";
import { colIcon } from "./icon";
import { cardLocales, cardResourceLocales } from "./locales";
import { cardSchema } from "./schema";
import { DefaultSlotMaterial } from "../DefualtSlot";
import { Card } from "expamples/ant5/components/Card";

const name = "Card"
export const CardMaterial: IComponentMaterial = {
  componentName: name,
  component: Card,
  designer: Card,
  designerLocales: cardLocales,
  designerSchema: cardSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
        props: {

        },
        slots: {
          title: {
            componentName: "DefaultSlot",
            props: {
            }
          },
          extra: {
            componentName: "DefaultSlot",
            props: {
            }
          },
          actions: {
            componentName: "DefaultSlot",
            props: {
            }
          }
        }
      }
    ]
  },
  icon: colIcon,
  color: "#dfa324",
  resourceLocales: cardResourceLocales,
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  },
  slots: {
    title: DefaultSlotMaterial,
    extor: DefaultSlotMaterial,
    actions: DefaultSlotMaterial,
  },
}
