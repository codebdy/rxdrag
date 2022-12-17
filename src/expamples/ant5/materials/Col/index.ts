import { IComponentMaterial } from "core-react";
import { Col as AntdCol } from "antd";
import { colIcon } from "./icon";
import { colLocales, colResourceLocales } from "./locales";
import { rowSchema } from "./schema";

export const ColMaterial: IComponentMaterial = {
  componentName: "Col",
  component: AntdCol,
  designer: AntdCol,
  designerLocales: colLocales,
  designerSchema: rowSchema,
  resource: {
    name: "Col",
    elements: [
      {
        componentName: "Col",
        props: {
          span: 6
        }
      }
    ]
  },
  icon: colIcon,
  color: "#dfa324",
  resourceLocales: colResourceLocales,
  behaviorRule: {
    droppable: true,
  }
}
