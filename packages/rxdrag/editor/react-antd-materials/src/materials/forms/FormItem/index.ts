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
  resource: {
    name: name,
    icon: formItemIcon,
    color: "#dfa324",
    resourceLocales: formItemResourceLocales,
    elements: [
      {
        componentName: name,
        props: {
          label: "FormItem"
        },
        locked: false,
      }
    ]
  },
  behaviorRule: {
    droppable: true,
    noRef: true,
    lockable: true,
  }
}
