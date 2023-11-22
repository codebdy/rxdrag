import { DrawerExtra } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { locales } from "./locales";
import { materialSchema } from "./schema";

const name = "DrawerExtra"
export const DrawerExtraMaterial: IMaterial = {
  componentName: name,
  component: DrawerExtra,
  designer: DrawerExtra,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    //readOnly: true,
  },

  behaviorRule: {
    droppable: true,
  }
}