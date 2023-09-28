import { Card } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { colIcon } from "./icon";
import { cardLocales, cardResourceLocales } from "./locales";
import { cardSchema } from "./schema";

const name = "Card"
export const CardMaterial: IMaterial = {
  componentName: name,
  component: Card,
  designer: Card,
  designerLocales: cardLocales,
  propsSchema: cardSchema,
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
