import { IComponentMaterial } from "core-react";
import { Layout } from "antd";
import { siderLocales } from "./locales";
import { siderSchema } from "./schema";

export const SiderMaterial: IComponentMaterial = {
  componentName: "Layout.Sider",
  component: Layout.Sider,
  designer: Layout.Sider,
  designerLocales: siderLocales,
  designerSchema: siderSchema,
  behaviorRule: {
    draggable:false,
    droppable: true,
    deletable: false,
    cloneable: false,
    noPlaceholder: true,
  },
  resource: {
    name: "Layout.Sider",
    elements: [
      {
        componentName: "Layout.Sider",
        props: {
        }
      }
    ]
  },
}
