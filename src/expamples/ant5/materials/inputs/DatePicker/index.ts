import { DatePicker } from "antd";
import { IComponentMaterial } from "core-react";
import { forwardRefById } from "core-react/hocs/forwardRefById";
import { datePickerIcon } from "./icon";
import { datePickerLocales, datePickerResourceLocales } from "./locales";
import { datePickerSchema } from "./schema";

const name = "DatePicker"
export const DatePickerMaterial: IComponentMaterial = {
  componentName: name,
  component: DatePicker,
  designer: forwardRefById(DatePicker, element => element?.parentElement?.parentElement),
  designerLocales: datePickerLocales,
  designerSchema: datePickerSchema,
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