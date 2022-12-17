import { IComponentMaterial } from "core-react";
import { Layout } from "antd";
import { headerLocales } from "./locales";
import { headerSchema } from "./schema";

export const HeaderMaterial: IComponentMaterial = {
  componentName: "Layout.Header",
  component: Layout.Header,
  designer: Layout.Header,
  designerLocales: headerLocales,
  designerSchema: headerSchema,
  behaviorRule: {
    draggable:false,
    droppable: true,
    deletable: false,
    cloneable: false,
    noPlaceholder: true,
  },
  resource: {
    name: "Layout.Header",
    elements: [
      {
        componentName: "Layout.Header",
        props: {
        }
      }
    ]
  },
}
