import { IMaterial, forwardRefById } from "@rxdrag/react-core";
import { DatePicker } from "antd";
import { rangePickerIcon } from "./icon";
import { dateRangePickerLocales, dateRangePickerResourceLocales } from "./locales";
import { dateRangePickerSchema } from "./schema";

const name = "DateRangePicker"
export const DateRangePickerMaterial: IMaterial = {
  componentName: name,
  component: DatePicker.RangePicker,
  designer: forwardRefById(DatePicker.RangePicker, element => {
    return (element as HTMLElement | null)?.parentElement?.parentElement
  }),
  designerLocales: dateRangePickerLocales,
  propsSchema: dateRangePickerSchema,
  designerProps: {
    inputReadOnly: true,
    open: false,
  },
  resource: {
    name: name,
    resourceLocales: dateRangePickerResourceLocales,
    icon: rangePickerIcon,
    color: "#0EDB77",
    elements: [
      {
        componentName: name,
      }
    ]
  },
}