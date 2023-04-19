import { DrawerFooter } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DrawerFooter"
export const DrawerFooterMaterial: IComponentMaterial = {
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