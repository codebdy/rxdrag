import { inlineFormIcon } from "./icon";
import { inlineFormLocales, inlineFormResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { Form as AntdForm } from "antd";
import { IMaterial } from "@rxdrag/react-core";
import { InlineForm } from "@rxdrag/react-antd-components";

const name = "InlineForm"
export const InlineFormMaterial: IMaterial = {
  componentName: name,
  component: InlineForm,
  designer: AntdForm,
  designerLocales: inlineFormLocales,
  propsSchema: formSchema,
  designerProps: {
    display: "visible"
  },
  resource: {
    name: name,
    icon: inlineFormIcon,
    color: "#dfa324",
    resourceLocales: inlineFormResourceLocales,
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
