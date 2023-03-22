import { Button } from "@rxdrag/react-antd-components";
import { IComponentMaterial } from "@rxdrag/react-core";
import { IconViewMaterial } from "../displays/IconView";
import { buttonIcon } from "./icon";
import { buttonLocales, buttonResourceLocales } from "./locales";
import { buttonSchema } from "./schema";

const name = "Button"
export const ButtonMaterial: IComponentMaterial = {
  componentName: name,
  component: Button,
  designer: Button,
  designerLocales: buttonLocales,
  designerSchema: buttonSchema,
  resource: {
    name: name,
    icon: buttonIcon,
    color: "#dfa324",
    resourceLocales: buttonResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          type: "primary",
          title: name,
        }
      }
    ]
  },

  slots: {
    icon: IconViewMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    lockable: true,
  }
}
