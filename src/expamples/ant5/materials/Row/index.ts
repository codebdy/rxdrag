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
    icon: rowIcon,
    color: "#dfa324",
    resourceLocales: rowResourceLocales,
    elements: [
      {
        componentName: "Row",
        props: {
        },
        children:[
          {
            componentName: "Col",
            props: {
              span: 6
            }
          },
          {
            componentName: "Col",
            props: {
              span: 6
            }
          },
          {
            componentName: "Col",
            props: {
              span: 6
            }
          },
          {
            componentName: "Col",
            props: {
              span: 6
            }
          }
        ]
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  }
}
