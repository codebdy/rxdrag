import { IComponentMaterial } from "@rxdrag/react-core";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { maretialSchema } from "./schema";

const name = "ImageView"
export const ImageViewMaterial: IComponentMaterial = {
  componentName: name,
  component: ImageView,
  designer: ImageView,
  designerLocales: locales,
  designerSchema: maretialSchema,
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
