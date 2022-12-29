import { IComponentMaterial } from "core-react";
import { Button } from "react-shells/ant5/components/Button";
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
        }
      }
    ]
  },
  icon: buttonIcon,
  color: "#dfa324",
  resourceLocales: buttonResourceLocales,
}
