import { Select } from "antd";
import { IComponentMaterial } from "core-react";
import { selectIcon } from "./icon";
import { selectLocales, selectResourceLocales } from "./locales";
import { selectSchema } from "./schema";

export const SelectMaterial: IComponentMaterial = {
  componentName: "Select",
  component: Select,
  designer: Select,
  designerLocales: selectLocales,
  designerSchema: selectSchema,
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