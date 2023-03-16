import { InputNumber } from "antd";
import { IComponentMaterial } from "core-react";
import { inputLocales } from "../Input/locales";
import { inputNumberIcon } from "./icon";
import { inputNumberResourceLocales } from "./locales";
import { inputNumberSchema } from "./schema";

const name = "InputNumber"
export const InputNumberMaterial: IComponentMaterial = {
  componentName: name,
  component: InputNumber,
  designer: InputNumber,
  designerLocales: inputLocales,
  designerSchema: inputNumberSchema,
  designerProps: {
    readOnly: true,
    style: {
      cursor: "default",
    }
  },
  resource: {
    name: name,
    resourceLocales: inputNumberResourceLocales,
    icon: inputNumberIcon,
    color: "#F5A623",
    elements: [
      {
        componentName: name
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