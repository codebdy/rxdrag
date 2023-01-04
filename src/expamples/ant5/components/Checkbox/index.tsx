import { forwardRef, memo } from "react"
import { Checkbox as AntdCheckbox } from "antd"

export type CheckboxProps = {
  label?: string
}
export const Checkbox = memo(forwardRef<HTMLInputElement>((props: CheckboxProps, ref) => {
  const { label, ...other } = props;
  return (
    <span  ref={ref}>
      <AntdCheckbox {...other}>
        {label}
      </AntdCheckbox>
    </span>
  )
}))