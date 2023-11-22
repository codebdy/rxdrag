import { IMaterial } from "@rxdrag/react-core";
import { rightAdIcon } from "./icon";
import { rightAdLocales, rightAdResourceLocales } from "./locales";
import { rightAdSchema } from "./schema";
import { RightAd } from "../../../components";

const name = "RightAd"
export const RightAdMaterial: IMaterial = {
  componentName: name,
  component: RightAd,
  designer: RightAd,
  designerLocales: rightAdLocales,
  propsSchema: rightAdSchema,
  resource: {
    name: name,
    icon: rightAdIcon,
    color: "#8B572A",
    resourceLocales: rightAdResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}
