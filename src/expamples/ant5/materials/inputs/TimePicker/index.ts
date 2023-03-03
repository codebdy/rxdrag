import { TimePicker } from "antd";
import { IComponentMaterial } from "core-react";
import { forwardRefById } from "core-react/hocs/forwardRefById";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TimePicker"
export const TimePickerMaterial: IComponentMaterial = {
  componentName: name,
  component: TimePicker,
  designer: forwardRefById(TimePicker, element => element?.parentElement?.parentElement),
  designerLocales: locales,
  designerSchema: materialSchema,
  designerProps: {
  },
  resource: {
    name: name,
    resourceLocales: resourceLocales,
    icon: icon,
    color: "#8B79EC",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}