import { Switch } from "antd";
import { IComponentMaterial } from "core-react";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Switch"
export const SwitchMaterial: IComponentMaterial = {
  componentName: name,
  component: Switch,
  designer: Switch,
  designerLocales: locales,
  designerSchema: materialSchema,
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