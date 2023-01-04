import { Input } from "antd";
import { IComponentMaterial } from "core-react";
import { inputIcon } from "./icon";
import { inputLocales, inputResourceLocales } from "./locales";
import { inputSchema } from "./schema";

export const InputMaterial: IComponentMaterial = {
  componentName: "Input",
  component: Input,
  designer: Input,
  designerLocales: inputLocales,
  designerSchema: inputSchema,
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