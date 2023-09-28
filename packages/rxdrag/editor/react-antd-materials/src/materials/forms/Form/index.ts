import { formIcon } from "./icon";
import { formLocales, formResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { Form as AntdForm } from "antd";
import { IMaterial } from "@rxdrag/react-core";
import { Form } from "@rxdrag/react-antd-components";

const name = "Form"
export const FormMaterial: IMaterial = {
  componentName: name,
  component: Form,
  designer: AntdForm,
  designerLocales: formLocales,
  propsSchema: formSchema,
  resource: {
    name: name,
    icon: formIcon,
    color: "#dfa324",
    resourceLocales: formResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          colon: false
        }
      }
    ]
  },

  behaviorRule: {
    droppable: true,
  }
}
