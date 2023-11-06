import React, { CSSProperties, ForwardedRef, forwardRef, memo } from "react"

export type ObjectContainerProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode,
}

export const ObjectContainer = memo(forwardRef((
  props: ObjectContainerProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return <div ref={ref} {...props} />
}))