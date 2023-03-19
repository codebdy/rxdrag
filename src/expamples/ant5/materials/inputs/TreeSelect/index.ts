import { TreeSelect } from "antd";
import { IComponentMaterial } from "core-react";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TreeSelect"
export const TreeSelectMaterial: IComponentMaterial = {
  componentName: name,
  component: TreeSelect,
  designer: TreeSelect,
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