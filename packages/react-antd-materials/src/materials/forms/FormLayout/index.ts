import { FormLayout } from "@rxdrag/react-antd-components";
import { formIcon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { formLayoutSchema } from "./schema";
import { IMaterial } from "@rxdrag/react-core";

const name = "FormLayout"
export const FormLayoutMaterial: IMaterial = {
  componentName: name,
  component: FormLayout,
  designer: FormLayout,
  designerLocales: locales,
  propsSchema: formLayoutSchema,
  designerProps: {
    display: "visible"
  },
  resource: {
    name: name,
    icon: formIcon,
    color: "#dfa324",
    resourceLocales: resourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          colon: false
        },
        "x-data": {
          type: "object"
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
