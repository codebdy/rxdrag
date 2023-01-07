import { IComponentMaterial } from "core-react";
import { DropdownMenuItemDesigner } from "./designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DropdownMenuItem"
export const DropdownMenuItemMaterial: IComponentMaterial = {
  componentName: name,
  component: DropdownMenuItemDesigner,
  designer: DropdownMenuItemDesigner,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: false,
  }
}