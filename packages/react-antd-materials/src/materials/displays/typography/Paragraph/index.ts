import { Paragraph } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Paragraph"
export const ParagraphMaterial: IMaterial = {
  componentName: name,
  component: Paragraph,
  designer: Paragraph,
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
