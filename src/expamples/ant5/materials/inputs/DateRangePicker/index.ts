import { IComponentMaterial } from "core-react";
import { DateRangePicker } from "expamples/ant5/components/DateRangePicker";
import { rangePickerIcon } from "./icon";
import { dateRangePickerLocales, dateRangePickerResourceLocales } from "./locales";
import { dateRangePickerSchema } from "./schema";

const name = "DateRangePicker"
export const DateRangePickerMaterial: IComponentMaterial = {
  componentName: name,
  component: DateRangePicker,
  designer: DateRangePicker,
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