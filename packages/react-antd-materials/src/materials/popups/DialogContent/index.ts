import { DialogContent } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DialogContent"
export const DialogContentMaterial: IComponentMaterial = {
  componentName: name,
  component: DialogContent,
  designer: DialogContent,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}