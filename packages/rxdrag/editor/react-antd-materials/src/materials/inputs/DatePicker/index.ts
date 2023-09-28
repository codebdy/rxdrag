import { IMaterial, forwardRefById } from "@rxdrag/react-core";
import { DatePicker } from "antd";
import { datePickerIcon } from "./icon";
import { datePickerLocales, datePickerResourceLocales } from "./locales";
import { datePickerSchema } from "./schema";

const name = "DatePicker"
export const DatePickerMaterial: IMaterial = {
  componentName: name,
  component: DatePicker,
  designer: forwardRefById(DatePicker, element => {
    return (element as HTMLElement | null)?.parentElement?.parentElement
  }),
  designerLocales: datePickerLocales,
  propsSchema: datePickerSchema,
  designerProps: {
    inputReadOnly: true,
    open: false,
  },
  resource: {
    name: name,
    resourceLocales: datePickerResourceLocales,
    icon: datePickerIcon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}