import { IMaterial, forwardRefById } from "@rxdrag/react-core";
import { Rate } from "antd";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Rate"
export const RateMaterial: IMaterial = {
  componentName: name,
  component: Rate,
  designer: forwardRefById(Rate),
  designerLocales: locales,
  propsSchema: materialSchema,
  designerProps: {
    value: 0,
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