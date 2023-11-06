import { IMaterial } from "@rxdrag/react-core";
import { InputNumber } from "antd";
import { inputLocales } from "../Input/locales";
import { inputNumberIcon } from "./icon";
import { inputNumberResourceLocales } from "./locales";
import { inputNumberSchema } from "./schema";

const name = "InputNumber"
export const InputNumberMaterial: IMaterial = {
  componentName: name,
  component: InputNumber,
  designer: InputNumber,
  designerLocales: inputLocales,
  propsSchema: inputNumberSchema,
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