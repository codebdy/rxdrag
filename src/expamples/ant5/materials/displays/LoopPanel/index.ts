import { IComponentMaterial } from "core-react";
import { LoopPanel } from "expamples/ant5/components/displays/LoopPanel";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "LoopPanel"
export const LoopPanelMaterial: IComponentMaterial = {
  componentName: name,
  component: LoopPanel,
  designer: LoopPanel,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    dataSource: { nodes: [{}] }
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