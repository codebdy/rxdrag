import { forwardRef, memo } from "react"
import { DatePicker as AntdDatePicker } from "antd"
import { RangePickerProps } from "antd/es/date-picker"


export const DateRangePicker = memo(forwardRef<HTMLInputElement>((props: RangePickerProps, ref) => {
  return (
    <div  ref={ref}>
      <AntdDatePicker.RangePicker {...props}/>
    </div>
  )
}))