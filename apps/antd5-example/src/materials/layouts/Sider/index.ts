import { IComponentMaterial } from "@rxdrag/react-core";
import { Sider } from "components/layouts/Sider";
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
