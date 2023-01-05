import { forwardRef, memo } from "react"
import { Radio as AntdRadio } from "antd"

export type RadioProps = {
  label?: string
}
export const Radio = memo(forwardRef<HTMLInputElement>((props: RadioProps, ref) => {
  const { label, ...other } = props;
  return (
    <span  ref={ref}>
      <AntdRadio {...other}>
        {label}
      </AntdRadio>
    </span>
  )
}))