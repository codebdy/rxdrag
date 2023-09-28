import { IMaterial } from "@rxdrag/react-core";
import { Layout } from "antd";
import { contentLocales } from "./locales";
import { contentSchema } from "./schema";

export const ContentMaterial: IMaterial = {
  componentName: "Layout.Content",
  component: Layout.Content,
  designer: Layout.Content,
  designerLocales: contentLocales,
  propsSchema: contentSchema,
  behaviorRule: {
    draggable:false,
    droppable: true,
    deletable: false,
    cloneable: false
  },
  resource: {
    name: "Layout.Content",
    elements: [
      {
        componentName: "Layout.Content",
        props: {
        }
      }
    ]
  },
}
