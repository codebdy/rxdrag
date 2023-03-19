import { IComponentMaterial } from "core-react";
import { Divider } from "antd";
import { dividerIcon } from "./icon";
import { dividerLocales, dividerResourceLocales } from "./locales";
import { dividerSchema } from "./schema";

const name = "Divider"
export const DividerMaterial: IComponentMaterial = {
  componentName: name,
  component: Divider,
  designer: Divider,
  designerLocales: dividerLocales,
  designerSchema: dividerSchema,
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
