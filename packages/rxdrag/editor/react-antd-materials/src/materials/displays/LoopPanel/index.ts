import { LoopPanel } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { LoopPanelDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "LoopPanel"
export const LoopPanelMaterial: IMaterial = {
  componentName: name,
  component: LoopPanel,
  designer: LoopPanelDesigner,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  },

  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}