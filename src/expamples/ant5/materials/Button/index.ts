import { Button } from "antd";
import { IComponentMaterial } from "core-react";
import { IconViewMaterial } from "../IconView";
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
    elements: [
      {
        componentName: name,
        props: {
          type: "primary",
          title: name,
        },
        children: [
          {
            componentName: "TextView",
            props: {
              content: name,
            }
          }
        ]
      }
    ]
  },
  icon: buttonIcon,
  color: "#dfa324",
  resourceLocales: buttonResourceLocales,
  slots: {
    icon: IconViewMaterial,
  },
  behaviorRule: {
    droppable: true,
  }
}
