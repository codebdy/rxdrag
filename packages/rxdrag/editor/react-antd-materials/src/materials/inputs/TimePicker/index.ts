import { forwardRefById, IMaterial } from "@rxdrag/react-core";
import { TimePicker } from "antd";
import { icon } from "./icon";
import { locales, resourceLocales } from "./locales";
import { materialSchema } from "./schema";

const name = "TimePicker"
export const TimePickerMaterial: IMaterial = {
  componentName: name,
  component: TimePicker,
  designer: forwardRefById(TimePicker, element => element?.parentElement?.parentElement),
  designerLocales: locales,
  propsSchema: materialSchema,
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