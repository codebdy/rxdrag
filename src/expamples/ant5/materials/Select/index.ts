import { Select } from "antd";
import { IComponentMaterial } from "core-react";
import { selectLocales } from "./locales";
import { selectSchema } from "./schema";

export const SelectMaterial: IComponentMaterial = {
  componentName: "Select",
  component: Select,
  designer: Select,
  designerLocales: selectLocales,
  designerSchema: selectSchema,
  designerProps: {
    open: false
  }
}