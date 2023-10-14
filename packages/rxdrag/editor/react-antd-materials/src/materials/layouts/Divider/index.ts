import { IMaterial } from "@rxdrag/react-core";
import { Divider } from "antd";
import { dividerIcon } from "./icon";
import { dividerLocales, dividerResourceLocales } from "./locales";
import { dividerSchema } from "./schema";

const name = "Divider"
export const DividerMaterial: IMaterial = {
  componentName: name,
  component: Divider,
  designer: Divider,
  designerLocales: dividerLocales,
  propsSchema: dividerSchema,
  resource: {
    name: name,
    icon: dividerIcon,
    color: "#dfa324",
    resourceLocales: dividerResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },

  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
    noRef: true,
  }
}
