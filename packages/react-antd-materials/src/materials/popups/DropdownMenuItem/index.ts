import { DropdownMenuItem } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { DropdownMenuItemDesigner } from "./designer";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DropdownMenuItem"
export const DropdownMenuItemMaterial: IComponentMaterial = {
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