import { forwardRef, memo } from "react"
import { DatePicker as AntdDatePicker, DatePickerProps } from "antd"


export const DatePicker = memo(forwardRef<HTMLInputElement>((props: DatePickerProps, ref) => {
  return (
    <div  ref={ref}>
      <AntdDatePicker {...props}/>
    </div>
  )
}))