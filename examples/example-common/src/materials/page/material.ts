import { IMaterial } from "@rxdrag/react-core";
import { PageDesigner } from "./Designer";
import { PagePreview } from "./Preview";
import { pageLocales } from "./locales";
import { schema } from "./schema";

export const PageMaterial: IMaterial = {
  componentName: "Page",
  component: PagePreview,
  designer: PageDesigner,
  propsSchema: schema,
  designerLocales: pageLocales,
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}