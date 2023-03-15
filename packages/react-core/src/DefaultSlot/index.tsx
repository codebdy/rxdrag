import React, { forwardRef, memo } from "react"

export const DefaultSlot = memo(forwardRef<HTMLDivElement>((props: {
  children?: React.ReactNode
}, ref) => {
  const { children, ...other } = props;
  return (
    <div ref={ref} {...other}>
      {children}
    </div>
  )
}))