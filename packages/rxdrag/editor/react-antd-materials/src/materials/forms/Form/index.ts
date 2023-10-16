import { formIcon } from "./icon";
import { formLocales, formResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { Form as AntdForm } from "antd";
import { IMaterial } from "@rxdrag/react-core";
import { Form, withContainerLayout } from "@rxdrag/react-antd-components";

const name = "Form"
export const FormMaterial: IMaterial = {
  componentName: name,
  component: Form,
  designer: withContainerLayout(AntdForm) ,
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
  },
  controller: {
    props: [
      {
        name: "value",
        label: "$value",
      },
      {
        name: "defaultValue",
        label: "$defaultValue",
      },
      {
        name: "initialValue",
        label: "$initialValue",
      },
    ],
    events: [
      {
        name: "onChange",
        label: "$onChange",
      }
    ],
    reactions: [
      {
        name: "validate",
        label: "$validate"
      },
      {
        name: "getValue",
        label: "$getValue",
      },
      {
        name: "setValue",
        label: "$setValue"
      }
    ]
  }
}
