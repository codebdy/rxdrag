import { IMaterial } from "@rxdrag/react-core";
import { Cascader } from "antd";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Cascader"
export const CascaderMaterial: IMaterial = {
  componentName: name,
  component: Cascader,
  designer: Cascader,
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
}