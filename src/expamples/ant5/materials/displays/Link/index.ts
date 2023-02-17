import { IComponentMaterial } from "core-react";
import { Link } from "expamples/ant5/components/displays/typography/Link";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Link"
export const LinkMaterial: IComponentMaterial = {
  componentName: name,
  component: Link,
  designer: Link,
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
