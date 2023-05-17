import { DialogTitle } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DialogTitle"
export const DialogTitleMaterial: IComponentMaterial = {
  componentName: name,
  component: DialogTitle,
  designer: DialogTitle,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}