import { IMaterial } from "@rxdrag/react-core";
import { Input } from "antd";
import { textareaIcon } from "./icon";
import { inputLocales, textareaResourceLocales } from "./locales";
import { textAreaSchema } from "./schema";

export const TextAreaMaterial: IMaterial = {
  componentName: "TextArea",
  component: Input.TextArea,
  designer: Input.TextArea,
  designerLocales: inputLocales,
  propsSchema: textAreaSchema,
  designerProps: {
    readOnly: true,
    style: {
      cursor: "default",
    }
  },
  resource: {
    name: "TextArea",
    resourceLocales: textareaResourceLocales,
    icon: textareaIcon,
    color: "#F5A623",
    elements: [
      {
        componentName: "TextArea",
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