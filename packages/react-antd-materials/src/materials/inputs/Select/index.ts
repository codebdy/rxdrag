import { IMaterial } from "@rxdrag/react-core";
import { Select } from "antd";
import { selectIcon } from "./icon";
import { selectLocales, selectResourceLocales } from "./locales";
import { selectSchema } from "./schema";

export const SelectMaterial: IMaterial = {
  componentName: "Select",
  component: Select,
  designer: Select,
  designerLocales: selectLocales,
  propsSchema: selectSchema,
  designerProps: {
    open: false
  },
  resource: {
    name: "Select",
    resourceLocales: selectResourceLocales,
    icon: selectIcon,
    color: "green",
    elements: [
      {
        componentName: "Select",
      }
    ]
  },

}