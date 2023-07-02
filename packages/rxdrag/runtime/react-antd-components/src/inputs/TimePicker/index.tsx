import { forwardRef, memo } from "react"
import { TimePicker as AntdTimePicker, TimePickerProps } from "antd"


export const TimePicker = memo(forwardRef<HTMLInputElement>((props: TimePickerProps, ref) => {
  return (
    <div  ref={ref}>
      <AntdTimePicker {...props}/>
    </div>
  )
}))