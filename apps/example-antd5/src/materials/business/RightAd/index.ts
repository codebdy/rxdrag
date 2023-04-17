import { IComponentMaterial } from "@rxdrag/react-core";
import { RightAd } from "components/business/RightAd";
import { rightAdIcon } from "./icon";
import { rightAdLocales, rightAdResourceLocales } from "./locales";
import { rightAdSchema } from "./schema";

const name = "RightAd"
export const RightAdMaterial: IComponentMaterial = {
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
