import { IComponentMaterial } from "core-react";
import { Sider } from "expamples/ant5/components/layouts/Sider";
import { siderLocales } from "./locales";
import { siderSchema } from "./schema";

export const SiderMaterial: IComponentMaterial = {
  componentName: "Layout.Sider",
  component: Sider,
  designer: Sider,
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
