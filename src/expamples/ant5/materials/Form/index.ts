import { IComponentMaterial } from "core-react";
import { formIcon } from "./icon";
import { boxLocales, boxResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { Form } from "antd";

const name = "Form"
export const FormMaterial: IComponentMaterial = {
  componentName: name,
  component: Form,
  designer: Form,
  designerLocales: boxLocales,
  designerSchema: formSchema,
  resource: {
    name: name,
    elements: [
      {
        componentName: name,
      }
    ]
  },
  icon: formIcon,
  color: "#dfa324",
  resourceLocales: boxResourceLocales,
  behaviorRule: {
    droppable: true,
  }
}
