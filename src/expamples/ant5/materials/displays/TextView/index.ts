import { IComponentMaterial } from "core-react";
import { TextView } from "expamples/ant5/components/displays/TextView";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "TextView"
export const TextViewMaterial: IComponentMaterial = {
  componentName: name,
  component: TextView,
  designer: TextView,
  designerLocales: locales,
  designerSchema: schema,
  resource: {
    name: name,
    icon: icon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          content: name,
        }
      }
    ]
  },

}
