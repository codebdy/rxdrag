import { IComponentMaterial } from "core-react";
import { ListItem } from "expamples/ant5/components/datas/ListItem";
import { ActionSlotMaterial } from "../../slots/ActionSlot";
import { ExtraSlotMaterial } from "../../slots/ExtraSlot";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "ListItem"
export const ListItemMaterial: IComponentMaterial = {
  componentName: name,
  component: ListItem,
  designer: ListItem,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  resource: {
    name: name,
    elements: [
      {
        componentName: name,
        children: [
          {
            componentName: "ListItemMeta"
          }
        ],
        slots: {
          actions: {
            componentName: "ActionSlot"
          },
          extra: {
            componentName: "ExtraSlot"
          },
        }
      }
    ]
  },
  slots: {
    actions: ActionSlotMaterial,
    extra: ExtraSlotMaterial,
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}