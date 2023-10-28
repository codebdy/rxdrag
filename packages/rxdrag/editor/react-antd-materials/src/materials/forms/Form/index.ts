import { formIcon } from "./icon";
import { formLocales, formResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { IMaterial } from "@rxdrag/react-core";
import { Form } from "@rxdrag/react-antd-components";

const name = "Form"
export const FormMaterial: IMaterial = {
  componentName: name,
  component: Form,
  designer: Form,
  designerLocales: formLocales,
  propsSchema: formSchema,
  designerProps: {
    display: "visible"
  },
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
      },
      {
        name: "reset",
        label: "$reset"
      }
    ]
  }
}
