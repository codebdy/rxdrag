import { IComponentMaterial } from "@rxdrag/react-core";
import { Hero } from "components/layouts/Hero";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

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
