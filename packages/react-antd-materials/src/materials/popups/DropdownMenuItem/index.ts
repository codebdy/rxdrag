import { IComponentMaterial } from "@rxdrag/react-core";
import { DropdownMenuItem } from "components/popups/DropdownMenuItem";
import { DropdownMenuItemDesigner } from "./designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DropdownMenuItem"
export const DropdownMenuItemMaterial: IComponentMaterial = {
  componentName: name,
  component: DropdownMenuItem,
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