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
    icon: iconViewIcon,
    color: "#8B79EC",
    resourceLocales: iconViewResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          icon: {
            iconKey: "QuestionOutlined",
          }
        }
      }
    ]
  },

}
