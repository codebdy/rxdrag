import { IMaterial } from "@rxdrag/react-core";
import { noticesIcon } from "./icon";
import { noticesLocales, noticesResourceLocales } from "./locales";
import { noticesSchema } from "./schema";
import { Notices } from "../../../components";

const name = "Notices"
export const NoticesMaterial: IMaterial = {
  componentName: name,
  component: Notices,
  designer: Notices,
  designerLocales: noticesLocales,
  propsSchema: noticesSchema,
  resource: {
    name: name,
    icon: noticesIcon,
    color: "#dfa324",
    resourceLocales: noticesResourceLocales,
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
