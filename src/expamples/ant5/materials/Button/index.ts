import { IComponentMaterial } from "core-react";
import { Button } from "react-shells/ant5/components/Button";
import { buttonIcon } from "./icon";
import { buttonLocales, buttonResourceLocales } from "./locales";
import { buttonSchema } from "./schema";

export const ButtonMaterial: IComponentMaterial = {
  componentName: "Button",
  component: Button,
  designer: Button,
  designerLocales: buttonLocales,
  designerSchema: buttonSchema,
  resource: {
    name: "Button",
    elements: [
      {
        componentName: "Button",
        props: {
          type: "primary",
          title: "Button",
        }
      }
    ]
  },
  icon: buttonIcon,
  color: "#dfa324",
  resourceLocales: buttonResourceLocales,
}
