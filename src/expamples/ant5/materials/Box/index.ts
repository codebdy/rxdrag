import { IComponentMaterial } from "core-react";
import { Col as AntdCol } from "antd";
import { boxIcon } from "./icon";
import { boxLocales, boxResourceLocales } from "./locales";
import { boxSchema } from "./schema";

const name = "Box"
export const BoxMaterial: IComponentMaterial = {
  componentName: name,
  component: AntdCol,
  designer: AntdCol,
  designerLocales: boxLocales,
  designerSchema: boxSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  icon: boxIcon,
  color: "#dfa324",
  resourceLocales: boxResourceLocales,
  behaviorRule: {
    droppable: true,
  }
}
