import { IComponentMaterial } from "core-react";
import { HeroTip } from "expamples/ant5/components/business/HeroTip";
import { heroTipIcon } from "./icon";
import { heroTipLocales, heroTipResourceLocales } from "./locales";
import { heroTipSchema } from "./schema";

const name = "HeroTip"
export const HeroTipMaterial: IComponentMaterial = {
  componentName: name,
  component: HeroTip,
  designer: HeroTip,
  designerLocales: heroTipLocales,
  designerSchema: heroTipSchema,
  resource: {
    name: name,
    icon: heroTipIcon,
    color: "#dfa324",
    resourceLocales: heroTipResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
        }
      }
    ]
  },

}
