import { IComponentMaterial } from "core-react";
import { formIcon } from "./icon";
import { formLocales, formResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { Form } from "antd";

const name = "Form"
export const FormMaterial: IComponentMaterial = {
  componentName: name,
  component: Form,
  designer: Form,
  designerLocales: formLocales,
  designerSchema: formSchema,
  resource: {
    name: name,
    icon: formIcon,
    color: "#dfa324",
    resourceLocales: formResourceLocales,
    elements: [
      {
        componentName: name,
        props:{
          colon: false
        }
      }
    ]
  },

  behaviorRule: {
    droppable: true,
  }
}
