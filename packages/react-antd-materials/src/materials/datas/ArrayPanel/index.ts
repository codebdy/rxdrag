import { ArrayPanel } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { ArrayPanelDesigner } from "./designer";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "ArrayPanel"
export const ArrayPanelMaterial: IMaterial = {
  componentName: name,
  component: ArrayPanel,
  designer: ArrayPanelDesigner,
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
        "x-data": {
          type: "array",
        }
      }
    ]
  },

  behaviorRule: {
    droppable: true,
    noPlaceholder: false,
  }
}