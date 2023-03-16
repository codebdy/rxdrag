import { Input } from "antd";
import { IComponentMaterial } from "core-react";
import { textareaIcon } from "./icon";
import { inputLocales, textareaResourceLocales } from "./locales";
import { textAreaSchema } from "./schema";

export const TextAreaMaterial: IComponentMaterial = {
  componentName: "TextArea",
  component: Input.TextArea,
  designer: Input.TextArea,
  designerLocales: inputLocales,
  designerSchema: textAreaSchema,
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