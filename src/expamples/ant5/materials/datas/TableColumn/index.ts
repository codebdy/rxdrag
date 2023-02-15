import { IComponentMaterial } from "core-react";
import { ListItem } from "expamples/ant5/components/datas/ListItem";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TableColumn"
export const TableColumnMaterial: IComponentMaterial = {
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
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}