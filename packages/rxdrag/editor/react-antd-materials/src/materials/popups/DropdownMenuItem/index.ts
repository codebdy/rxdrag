import { DropdownMenuItem } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { DropdownMenuItemDesigner } from "./designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DropdownMenuItem"
export const DropdownMenuItemMaterial: IMaterial = {
  componentName: name,
  component: DropdownMenuItem,
  designer: DropdownMenuItemDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: false,
  }
}