import { IMaterial } from "@rxdrag/react-core";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";
import {Text} from "@rxdrag/react-antd-components"

const name = "Text"
export const TextMaterial: IMaterial = {
  componentName: name,
  component: Text,
  designer: Text,
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
