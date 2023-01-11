import { IComponentMaterial } from "core-react";
import { Rate } from "expamples/ant5/components/inputs/Rate";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Rate"
export const RateMaterial: IComponentMaterial = {
  componentName: name,
  component: Rate,
  designer: Rate,
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
    //readOnly: true,
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