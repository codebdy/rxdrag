import { IComponentMaterial } from "@rxdrag/react-core";
import { DrawerTitle } from "components/popups/DrawerTitle";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DrawerTitle"
export const DrawerTitleMaterial: IComponentMaterial = {
  componentName: name,
  component: DrawerTitle,
  designer: DrawerTitle,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}