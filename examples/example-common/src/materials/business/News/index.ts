import { IMaterial } from "@rxdrag/react-core";
import { newsIcon } from "./icon";
import { newsLocales, newsResourceLocales } from "./locales";
import { newsSchema } from "./schema";
import { News } from "../../../components";

const name = "News"
export const NewsMaterial: IMaterial = {
  componentName: name,
  component: News,
  designer: News,
  designerLocales: newsLocales,
  propsSchema: newsSchema,
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
