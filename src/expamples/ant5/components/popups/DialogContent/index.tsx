import React, { forwardRef, memo } from "react"

export type DialogContentProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DialogContent = memo(forwardRef<HTMLDivElement>((props: DialogContentProps, ref) => {
  const { children, ...other } = props;
  return <div ref={ref} {...other}>
    {children}
  </div>
}))