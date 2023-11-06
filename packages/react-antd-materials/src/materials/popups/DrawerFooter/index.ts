import { DrawerFooter } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DrawerFooter"
export const DrawerFooterMaterial: IMaterial = {
  componentName: name,
  component: DrawerFooter,
  designer: DrawerFooter,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}