import React, { CSSProperties, ForwardedRef, forwardRef, memo } from "react"

export type BoxProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode,
}

export const Box = memo(forwardRef((
  props: BoxProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return <div ref={ref} {...props} />
}))