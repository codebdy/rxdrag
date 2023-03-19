import { IComponentMaterial } from "core-react";
import { Text } from "expamples/ant5/components/displays/typography/Text";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Text"
export const TextMaterial: IComponentMaterial = {
  componentName: name,
  component: Text,
  designer: Text,
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
