import { IComponentMaterial } from "core-react";
import { TextView } from "expamples/ant5/components/TextView";
import { textViewIcon } from "./icon";
import { textViewLocales, textViewResourceLocales } from "./locales";
import { textViewSchema } from "./schema";

const name = "TextView"
export const TextViewMaterial: IComponentMaterial = {
  componentName: name,
  component: TextView,
  designer: TextView,
  designerLocales: textViewLocales,
  designerSchema: textViewSchema,
  resource: {
    name: name,
    icon: textViewIcon,
    color: "#dfa324",
    resourceLocales: textViewResourceLocales,
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
