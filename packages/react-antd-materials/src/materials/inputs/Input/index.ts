import { IMaterial, switchRef } from "@rxdrag/react-core";
import { Input } from "antd";
import { inputIcon } from "./icon";
import { inputLocales, inputResourceLocales } from "./locales";
import { inputSchema } from "./schema";

export * from "./textarea"

export const InputMaterial: IMaterial = {
  componentName: "Input",
  component: Input,
  designer: switchRef(Input, (element?: unknown) => {
    const inputElement = (element as { input: HTMLElement | null })?.input
    // if(inputElement?.parentElement?.classList.contains("ant-input-affix-wrapper")){
    //   if(inputElement?.parentElement.parentElement?.classList.contains("ant-input-wrapper")){
    //     return inputElement?.parentElement.parentElement
    //   }
    //   return inputElement.parentElement
    // }
    return inputElement
    //return inputElement?.parentElement?.parentElement
  }),
  designerLocales: inputLocales,
  propsSchema: inputSchema,
  designerProps: {
    readOnly: true,
    style: {
      cursor: "default",
    }
  },
  resource: {
    name: "Input",
    resourceLocales: inputResourceLocales,
    icon: inputIcon,
    color: "#F5A623",
    elements: [
      {
        componentName: "Input",
      }
    ],
  },
  slots: {
    addonAfter: true,
    addonBefore: true,
    prefix: true,
    suffix: true,
  }
}