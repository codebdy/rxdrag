import { IComponentMaterial } from "core-react";
import { Paragraph } from "expamples/ant5/components/displays/typography/Paragraph";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Paragraph"
export const ParagraphMaterial: IComponentMaterial = {
  componentName: name,
  component: Paragraph,
  designer: Paragraph,
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
          value: name,
        }
      }
    ]
  },

}
