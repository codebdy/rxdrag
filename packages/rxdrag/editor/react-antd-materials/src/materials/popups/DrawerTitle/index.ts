import { DrawerTitle } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DrawerTitle"
export const DrawerTitleMaterial: IMaterial = {
  componentName: name,
  component: DrawerTitle,
  designer: DrawerTitle,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}