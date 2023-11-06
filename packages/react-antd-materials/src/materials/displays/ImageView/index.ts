import { ImageView } from "@rxdrag/react-antd-components";
import { IMaterial } from "@rxdrag/react-core";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "ImageView"
export const ImageViewMaterial: IMaterial = {
  componentName: name,
  component: ImageView,
  designer: ImageView,
  designerLocales: locales,
  propsSchema: materialSchema,
  resource: {
    name: name,
    icon: icon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },

}
