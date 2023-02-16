import { forwardRef, memo } from "react"
import { Checkbox as AntdCheckbox } from "antd"
import { switchRefById } from "core-react/switchRefById"

export type CheckboxProps = {
  label?: string
}

const ForwardCheckbox = switchRefById(AntdCheckbox, element=>element?.parentElement?.parentElement)

export const Checkbox = memo(forwardRef<HTMLInputElement>((props: CheckboxProps, ref) => {
  const { label, ...other } = props;
  return (
    <ForwardCheckbox ref={ref} {...other}>
      {label}
    </ForwardCheckbox>
  )
}))