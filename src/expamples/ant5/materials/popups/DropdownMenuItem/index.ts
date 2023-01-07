import { IComponentMaterial } from "core-react";
import { MenuItemDesigner } from "./designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DropdownMenuItem"
export const DropdownMenuItemMaterial: IComponentMaterial = {
  componentName: name,
  component: MenuItemDesigner,
  designer: MenuItemDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: false,
  }
}