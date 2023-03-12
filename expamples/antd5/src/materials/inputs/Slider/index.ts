import { IComponentMaterial } from "core-react";
import { Slider } from "expamples/ant5/components/inputs/Slider";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "Slider"
export const SliderMaterial: IComponentMaterial = {
  componentName: name,
  component: Slider,
  designer: Slider,
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