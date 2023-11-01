import React, { CSSProperties, ForwardedRef, forwardRef } from "react"

export type TreeListProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode,
}

export const TreeList = forwardRef((
  props: TreeListProps,
  ref: ForwardedRef<HTMLDivElement>
) => {
  return <div ref={ref} {...props} />
})