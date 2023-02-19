import { IComponentMaterial } from "core-react";
import { Tag } from "expamples/ant5/components/displays/Tag";
import { IconViewMaterial } from "../IconView";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { schema } from "./schema";

const name = "Tag"
export const TagMaterial: IComponentMaterial = {
  componentName: name,
  component: Tag,
  designer: Tag,
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
  slots: {
    icon: IconViewMaterial,
  },
}
