import { IMaterial } from "@rxdrag/react-core";
import { boxIcon } from "./icon";
import { boxLocales, boxResourceLocales } from "./locales";
import { boxSchema } from "./schema";
import { Box } from "@rxdrag/react-antd-components"


const name = "Box"
export const BoxMaterial: IMaterial = {
  componentName: name,
  component: Box,
  designer: Box,
  designerLocales: boxLocales,
  propsSchema: boxSchema,
  resource: {
    name: name,
    icon: boxIcon,
    color: "#dfa324",
    resourceLocales: boxResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
  }
}
