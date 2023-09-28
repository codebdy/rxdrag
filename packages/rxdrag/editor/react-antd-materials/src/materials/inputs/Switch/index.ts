import { IMaterial } from "@rxdrag/react-core";
import { Switch } from "antd";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Switch"
export const SwitchMaterial: IMaterial = {
  componentName: name,
  component: Switch,
  designer: Switch,
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    checked: false,
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