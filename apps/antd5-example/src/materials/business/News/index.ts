import { IComponentMaterial } from "@rxdrag/react-core";
import { News } from "components/business/News";
import { newsIcon } from "./icon";
import { newsLocales, newsResourceLocales } from "./locales";
import { newsSchema } from "./schema";

const name = "News"
export const NewsMaterial: IComponentMaterial = {
  componentName: name,
  component: News,
  designer: News,
  designerLocales: newsLocales,
  designerSchema: newsSchema,
  resource: {
    name: name,
    icon: newsIcon,
    color: "#dfa324",
    resourceLocales: newsResourceLocales,
    elements: [
      {
        componentName: name,
      }
    ]
  },

  behaviorRule: {
    droppable: true,
    noPlaceholder: true,
  }
}
