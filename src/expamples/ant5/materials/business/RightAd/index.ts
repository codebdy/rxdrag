import { IComponentMaterial } from "core-react";
import { rightAdIcon } from "./icon";
import { rightAdLocales, rightAdResourceLocales } from "./locales";
import { rightAdSchema } from "./schema";
import { RightAd } from "expamples/ant5/components/business/RightAd";

const name = "RightAd"
export const RightAdMaterial: IComponentMaterial = {
  componentName: name,
  component: RightAd,
  designer: RightAd,
  designerLocales: rightAdLocales,
  designerSchema: rightAdSchema,
  resource: {
    name: name,
    icon: rightAdIcon,
    color: "#8B572A",
    resourceLocales: rightAdResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}
