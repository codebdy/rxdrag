import { IComponentMaterial } from "core-react";
import { DrawerContent } from "expamples/ant5/components/popups/DrawerContent";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DrawerContent"
export const DrawerContentMaterial: IComponentMaterial = {
  componentName: name,
  component: DrawerContent,
  designer: DrawerContent,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}