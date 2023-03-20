
import { IResource } from "@rxdrag/core";
import { inputIcon } from "../../inputs/Input/icon";
import { inputFieldResourceLocales } from "./locales";

export const InputFieldResource: IResource = {
  name: "InputField",
  icon: inputIcon,
  color: "#dfa324",
  resourceLocales: inputFieldResourceLocales,
  elements: [
    {
      componentName: "Field",
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
}
