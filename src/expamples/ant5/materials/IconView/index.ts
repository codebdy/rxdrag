import { IComponentMaterial } from "core-react";
import { IconView } from "react-shells/ant5/components/IconView";
import { iconViewIcon } from "./icon";
import { iconViewLocales, iconViewResourceLocales } from "./locales";
import { iconViewSchema } from "./schema";

const name = "IconView"
export const IconViewMaterial: IComponentMaterial = {
  componentName: name,
  component: IconView,
  designer: IconView,
  designerLocales: iconViewLocales,
  designerSchema: iconViewSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  icon: iconViewIcon,
  color: "#dfa324",
  resourceLocales: iconViewResourceLocales,
}
