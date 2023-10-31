import { Link } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Link"
export const LinkMaterial: IMaterial = {
  componentName: name,
  component: Link,
  designer: Link,
  designerLocales: locales,
  propsSchema: schema,
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
