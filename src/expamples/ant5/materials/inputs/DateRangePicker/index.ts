import { DatePicker } from "antd";
import { IComponentMaterial } from "core-react";
import { rangePickerIcon } from "./icon";
import { dateRangePickerLocales, dateRangePickerResourceLocales } from "./locales";
import { dateRangePickerSchema } from "./schema";

const { RangePicker } = DatePicker;
const name = "DateRangePicker"
export const DateRangePickerMaterial: IComponentMaterial = {
  componentName: name,
  component: RangePicker,
  designer: RangePicker,
  designerLocales: dateRangePickerLocales,
  designerSchema: dateRangePickerSchema,
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