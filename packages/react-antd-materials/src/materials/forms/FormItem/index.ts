import { formItemIcon } from "./icon";
import { formItemLocales, formItemResourceLocales } from "./locales";
import { formItemSchema } from "./schema";
import { IMaterial } from "@rxdrag/react-core";
import { FormItem } from "@rxdrag/react-antd-components";
import { FormItemDesigner } from "./designer";

const name = "FormItem"
export const FormItemMaterial: IMaterial = {
  componentName: name,
  component: FormItem,
  designer: FormItemDesigner,
  designerLocales: formItemLocales,
  propsSchema: formItemSchema,
  designerProps: {
    display: "visible"
  },
  resource: {
    name: name,
    icon: formItemIcon,
    color: "#dfa324",
    resourceLocales: formItemResourceLocales,
    elements: [
      {
        componentName: name,
        "x-data":{
          label: name
        },
        locked: false,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noRef: true,
    lockable: true,
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
