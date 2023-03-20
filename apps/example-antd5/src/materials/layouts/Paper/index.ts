import { IComponentMaterial } from "@rxdrag/react-core";
import { Paper } from "components/layouts/Paper";
import { paperIcon } from "./icon";
import { paperLocales, paperResourceLocales } from "./locales";
import { paperSchema } from "./schema";

const name = "Paper"
export const PaperMaterial: IComponentMaterial = {
  componentName: name,
  component: Paper,
  designer: Paper,
  designerLocales: paperLocales,
  designerSchema: paperSchema,
  resource: {
    name: name,
    icon: paperIcon,
    color: "#dfa324",
    resourceLocales: paperResourceLocales,
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
