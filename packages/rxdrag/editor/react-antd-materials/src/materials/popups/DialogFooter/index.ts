import { DialogFooter } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DialogFooter"
export const DialogFooterMaterial: IComponentMaterial = {
  componentName: name,
  component: DialogFooter,
  designer: DialogFooter,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}