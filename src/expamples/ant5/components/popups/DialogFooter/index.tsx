import React, { forwardRef, memo } from "react"
import "./style.less"

export type DialogFooterProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DialogFooter = memo(forwardRef<HTMLDivElement>((props: DialogFooterProps, ref) => {
  const { children, ...other } = props;
  return <div className="rx-dialog-footer" {...other}>
    {children}
  </div>
}))