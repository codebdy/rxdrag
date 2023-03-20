import { IComponentMaterial } from "@rxdrag/react-core";
import { Breadcrumb } from "components/layouts/Breadcrumb";
import { breadcrumbIcon } from "./icon";
import { breadcrumbLocales, breadcrumbResourceLocales } from "./locales";
import { breadcrumbSchema } from "./schema";

const name = "Breadcrumb"
export const BreadcrumbMaterial: IComponentMaterial = {
  componentName: name,
  component: Breadcrumb,
  designer: Breadcrumb,
  designerLocales: breadcrumbLocales,
  designerSchema: breadcrumbSchema,
  resource: {
    name: name,
    icon: breadcrumbIcon,
    color: "#dfa324",
    resourceLocales: breadcrumbResourceLocales,
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
