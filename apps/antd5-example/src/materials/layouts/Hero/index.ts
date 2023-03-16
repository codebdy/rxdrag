import { IComponentMaterial } from "core-react";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";
import { Hero } from "expamples/ant5/components/layouts/Hero";

const name = "Hero"
export const HeroMaterial: IComponentMaterial = {
  componentName: name,
  component: Hero,
  designer: Hero,
  designerLocales: locales,
  designerSchema: materialSchema,
  resource: {
    name: name,
    icon: icon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
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
