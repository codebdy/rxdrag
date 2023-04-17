import React, { CSSProperties, ForwardedRef, forwardRef } from "react"

export type BoxProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode
}

export const Box = forwardRef((
  props: BoxProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return <div ref={ref} {...props} />
})