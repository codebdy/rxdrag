import { IComponentMaterial } from "core-react";
import { Row as AntdRow } from "antd";
import { rowIcon } from "./icon";
import { rowLocales, rowResourceLocales } from "./locales";
import { rowSchema } from "./schema";

export const RowMaterial: IComponentMaterial = {
  componentName: "Row",
  component: AntdRow,
  designer: AntdRow,
  designerLocales: rowLocales,
  designerSchema: rowSchema,
  resource: {
    name: "Row",
    elements: [
      {
        componentName: "Row",
        props: {
        }
      }
    ]
  },
  icon: rowIcon,
  color: "#dfa324",
  resourceLocales: rowResourceLocales,
  behaviorRule: {
    droppable: true,
  }
}
