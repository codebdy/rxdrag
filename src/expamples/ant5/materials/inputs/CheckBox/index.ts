import { Checkbox } from "antd";
import { IComponentMaterial } from "core-react";
import { checkboxIcon } from "./icon";
import { checkboxLocales, selectResourceLocales } from "./locales";
import { selectSchema } from "./schema";

const name = "Checkbox"
export const CheckboxMaterial: IComponentMaterial = {
  componentName: name,
  component: Checkbox,
  designer: Checkbox,
  designerLocales: checkboxLocales,
  designerSchema: selectSchema,
  designerProps: {
    open: false,
  },
  resource: {
    name: name,
    resourceLocales: selectResourceLocales,
    icon: checkboxIcon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}