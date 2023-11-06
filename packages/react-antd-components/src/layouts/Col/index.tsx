import React, { CSSProperties, ForwardedRef, forwardRef, memo } from "react"
import { Col as AntdCol } from "antd";

export type ColProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode,
  display?: boolean,
}

export const Col = memo(forwardRef((
  props: ColProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  const { display = true, ...rest } = props

  return display ? <AntdCol ref={ref} {...rest} /> : <></>
}))