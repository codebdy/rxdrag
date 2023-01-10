import { IComponentMaterial } from "core-react";
import { boxIcon } from "./icon";
import { boxLocales, boxResourceLocales } from "./locales";
import { boxSchema } from "./schema";
import { Box } from "react-shells/ant5/components/Box";

const name = "Box"
export const BoxMaterial: IComponentMaterial = {
  componentName: name,
  component: Box,
  designer: Box,
  designerLocales: boxLocales,
  designerSchema: boxSchema,
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
