import { List } from "antd";
import { IComponentMaterial } from "core-react";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "ListItem"
export const ListItemMaterial: IComponentMaterial = {
  componentName: name,
  component: List.Item,
  designer: List.Item,
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
        ]
      }
    ]
  },

  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}