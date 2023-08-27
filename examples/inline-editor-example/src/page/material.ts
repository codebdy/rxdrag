import { IComponentMaterial } from "@rxdrag/react-core";
import { PageDesigner } from "./Designer";
import { PagePreview } from "./Preview";
import { pageLocales } from "./locales";
import { paeSchema } from "./schema";

export const pageMaterial: IComponentMaterial = {
  componentName: "Page",
  component: PagePreview,
  designer: PageDesigner,
  propsSchema: paeSchema,
  designerLocales: pageLocales,
  behaviorRule: {
    droppable: true,
  }
}