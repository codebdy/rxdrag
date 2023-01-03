import { IComponentMaterial } from "core-react";
import { Field } from "react-shells/ant5/components/Field";
import { InputMaterial } from "../../Input";
import { inputIcon } from "../../Input/icon";
import { fieldLocales, inputFieldResourceLocales } from "./locales";
import { fieldSchema } from "./schema";

const name = "Field"
export const InputFieldMaterial: IComponentMaterial = {
  componentName: name,
  component: Field,
  designer: Field,
  designerLocales: fieldLocales,
  designerSchema: fieldSchema,
  resource: {
    name: "InputField",
    elements: [
      {
        componentName: name,
        props: {
          label: "InputField",
        },
        locked: true,
        slots: {
          input: {
            componentName: "Input",
            props: {
              placeholder: "输入框",
            }
          }
        }
      }
    ]
  },
  icon: inputIcon,
  color: "#dfa324",
  resourceLocales: inputFieldResourceLocales,
  slots: {
    input: InputMaterial,
  },
  behaviorRule: {
    droppable: false,
    noPlaceholder: true,
    noRef: true,
    lockable: true,
  }
}
