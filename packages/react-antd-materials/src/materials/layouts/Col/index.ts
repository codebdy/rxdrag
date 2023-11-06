
import { IMaterial } from "@rxdrag/react-core";
import { colIcon } from "./icon";
import { colLocales, colResourceLocales } from "./locales";
import { rowSchema } from "./schema";
import { Col } from "@rxdrag/react-antd-components";

export const ColMaterial: IMaterial = {
  componentName: "Col",
  component: Col,
  designer: Col,
  designerLocales: colLocales,
  propsSchema: rowSchema,
  resource: {
    name: "Col",
    icon: colIcon,
    color: "#dfa324",
    resourceLocales: colResourceLocales,
    elements: [
      {
        componentName: "Col",
        props: {
          span: 6
        }
      }
    ]
  },

  behaviorRule: {
    droppable: true,
  }
}
