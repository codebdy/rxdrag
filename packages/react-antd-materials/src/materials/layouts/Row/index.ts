import { IMaterial } from "@rxdrag/react-core";
import { Row as AntdRow } from "antd";
import { rowIcon } from "./icon";
import { rowLocales, rowResourceLocales } from "./locales";
import { rowSchema } from "./schema";

export const RowMaterial: IMaterial = {
  componentName: "Row",
  component: AntdRow,
  designer: AntdRow,
  designerLocales: rowLocales,
  propsSchema: rowSchema,
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
