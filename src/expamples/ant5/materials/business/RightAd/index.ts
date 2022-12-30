import { IComponentMaterial } from "core-react";
import { rightAdIcon } from "./icon";
import { rightAdLocales, rightAdResourceLocales } from "./locales";
import { rightAdSchema } from "./schema";
import { RightAd } from "expamples/ant5/components/RightAd";

const name = "RightAd"
export const RightAdMaterial: IComponentMaterial = {
  componentName: name,
  component: RightAd,
  designer: RightAd,
  designerLocales: rightAdLocales,
  designerSchema: rightAdSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  icon: rightAdIcon,
  color: "#dfa324",
  resourceLocales: rightAdResourceLocales,
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}
