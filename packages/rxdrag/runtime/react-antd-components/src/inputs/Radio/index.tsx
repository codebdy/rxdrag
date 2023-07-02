import { forwardRef, memo } from "react"
import { Radio as AntdRadio } from "antd"
import { forwardRefById } from "@rxdrag/react-core"

export type RadioProps = {
  label?: string
}
const ForwardRadio = forwardRefById(AntdRadio, element => element?.parentElement?.parentElement)

export const Radio = memo(forwardRef<HTMLInputElement>((props: RadioProps, ref) => {
  const { label, ...other } = props;
  return (
    <ForwardRadio ref={ref} {...other}>
      {label}
    </ForwardRadio>
  )
}))