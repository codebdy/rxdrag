import { inlineFormIcon } from "./icon";
import { inlineFormLocales, inlineFormResourceLocales } from "./locales";
import { formSchema } from "./schema";
import { Form as AntdForm } from "antd";
import { IComponentMaterial } from "@rxdrag/react-core";
import { InlineForm } from "@rxdrag/react-antd-components";

const name = "InlineForm"
export const InlineFormMaterial: IComponentMaterial = {
  componentName: name,
  component: InlineForm,
  designer: AntdForm,
  designerLocales: inlineFormLocales,
  propsSchema: formSchema,
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
