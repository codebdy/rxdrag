import { IMaterial } from "@rxdrag/react-core";
import { PageDesigner } from "./Designer";
import { pageLocales } from "./locales";
import { schema } from "./schema";
import { Page } from "@rxdrag/react-antd-components";

export const PageMaterial: IMaterial = {
  componentName: "Page",
  component: Page,
  designer: PageDesigner,
  propsSchema: schema,
  designerLocales: pageLocales,
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  },
  controller: {
    events: [
      {
        name: "onInit",
        label: "$onInit",
      }
    ]
  }
}