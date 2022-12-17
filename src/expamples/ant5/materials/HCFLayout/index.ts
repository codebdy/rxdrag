import { IComponentMaterial } from "core-react";
import { colIcon } from "./icon";
import { hCFLayoutLocales, hCFLayoutResourceLocales } from "./locales";
import { hCFLayoutSchema } from "./schema";
import { HCFLayout } from "expamples/ant5/components/HCFLayout";

const name = "HCFLayout"
export const HCFLayoutMaterial: IComponentMaterial = {
  componentName: name,
  component: HCFLayout,
  designer: HCFLayout,
  designerLocales: hCFLayoutLocales,
  designerSchema: hCFLayoutSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
        props: {
          span: 6
        }
      }
    ]
  },
  icon: colIcon,
  color: "#dfa324",
  resourceLocales: hCFLayoutResourceLocales,
  behaviorRule: {
    droppable: true,
  }
}
