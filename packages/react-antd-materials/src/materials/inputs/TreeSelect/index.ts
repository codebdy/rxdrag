import { IMaterial } from "@rxdrag/react-core";
import { TreeSelect } from "antd";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TreeSelect"
export const TreeSelectMaterial: IMaterial = {
  componentName: name,
  component: TreeSelect,
  designer: TreeSelect,
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