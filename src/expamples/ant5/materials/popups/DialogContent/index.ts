import { IComponentMaterial } from "core-react";
import { DialogContent } from "expamples/ant5/components/popups/DialogContent";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DialogContent"
export const DialogContentMaterial: IComponentMaterial = {
  componentName: name,
  component: DialogContent,
  designer: DialogContent,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}