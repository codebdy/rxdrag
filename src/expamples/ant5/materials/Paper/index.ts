import { IComponentMaterial } from "core-react";
import { paperIcon } from "./icon";
import { paperLocales, paperResourceLocales } from "./locales";
import { paperSchema } from "./schema";
import { Paper } from "expamples/ant5/components/layouts/Paper";

const name = "Paper"
export const PaperMaterial: IComponentMaterial = {
  componentName: name,
  component: Paper,
  designer: Paper,
  designerLocales: paperLocales,
  designerSchema: paperSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  icon: paperIcon,
  color: "#dfa324",
  resourceLocales: paperResourceLocales,
  behaviorRule: {
    droppable: true,
  }
}
