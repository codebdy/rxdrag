import { IconView } from "@rxdrag/react-antd-icons";
import { IMaterial } from "@rxdrag/react-core";
import { iconViewIcon } from "./icon";
import { iconViewLocales, iconViewResourceLocales } from "./locales";
import { iconViewSchema } from "./schema";

const name = "IconView"
export const IconViewMaterial: IMaterial = {
  componentName: name,
  component: IconView,
  designer: IconView,
  designerLocales: iconViewLocales,
  propsSchema: iconViewSchema,
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
