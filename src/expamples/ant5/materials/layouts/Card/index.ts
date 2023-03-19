import { IComponentMaterial } from "core-react";
import { colIcon } from "./icon";
import { cardLocales, cardResourceLocales } from "./locales";
import { cardSchema } from "./schema";
import { Card } from "expamples/ant5/components/layouts/Card";

const name = "Card"
export const CardMaterial: IComponentMaterial = {
  componentName: name,
  component: Card,
  designer: Card,
  designerLocales: cardLocales,
  designerSchema: cardSchema,
  resource: {
    name: name,
    icon: colIcon,
    color: "#dfa324",
    resourceLocales: cardResourceLocales,
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

  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  },
  slots: {
    title: true,
    extra: true,
    actions: true,
  },
}
