import { IComponentMaterial } from "core-react";
import { icon } from "./icon";
import { boxLocales, boxResourceLocales } from "./locales";
import { boxSchema } from "./schema";
import { Hero } from "expamples/ant5/components/layouts/Hero";

const name = "Hero"
export const HeroMaterial: IComponentMaterial = {
  componentName: name,
  component: Hero,
  designer: Hero,
  designerLocales: boxLocales,
  designerSchema: boxSchema,
  resource: {
    name: name,
    icon: icon,
    color: "#dfa324",
    resourceLocales: boxResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  }
}
