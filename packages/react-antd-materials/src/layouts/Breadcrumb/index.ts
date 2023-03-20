import { IComponentMaterial } from "@rxdrag/react-core";
import { breadcrumbIcon } from "./icon";
import { breadcrumbLocales, breadcrumbResourceLocales } from "./locales";
import { breadcrumbSchema } from "./schema";
import { Breadcrumb } from "@rxdrag/react-antd-components";

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
