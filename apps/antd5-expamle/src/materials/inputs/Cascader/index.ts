import { Cascader } from "antd";
import { IComponentMaterial } from "core-react";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Cascader"
export const CascaderMaterial: IComponentMaterial = {
  componentName: name,
  component: Cascader,
  designer: Cascader,
  designerLocales: locales,
  designerSchema: materialSchema,
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