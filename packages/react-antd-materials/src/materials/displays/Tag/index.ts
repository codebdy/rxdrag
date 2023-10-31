import { Tag } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { IconViewMaterial } from "../IconView";
import { icon } from "./icon";
import { locales, resourceLocales, setterLocales } from "./locales";
import { schema } from "./schema";
import { TagColorInput } from "./setters/TagColorInput";

const name = "Tag"
export const TagMaterial: IMaterial = {
  componentName: name,
  component: Tag,
  designer: Tag,
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
  slots: {
    icon: IconViewMaterial,
  },
  setterLocales: setterLocales,
  setters:{
    TagColorInput,
  }
}
