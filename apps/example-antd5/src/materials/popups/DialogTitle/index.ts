import { IComponentMaterial } from "@rxdrag/react-core";
import { DialogTitle } from "components/popups/DialogTitle";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DialogTitle"
export const DialogTitleMaterial: IComponentMaterial = {
  componentName: name,
  component: DialogTitle,
  designer: DialogTitle,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}