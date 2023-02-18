import { IComponentMaterial } from "core-react";
import { Title } from "expamples/ant5/components/displays/typography/Title";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Title"
export const TitleMaterial: IComponentMaterial = {
  componentName: name,
  component: Title,
  designer: Title,
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
