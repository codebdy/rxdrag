import React, { forwardRef, memo } from "react"

export type DrawerContentProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DrawerContent = memo(forwardRef<HTMLDivElement>((props: DrawerContentProps, ref) => {
  const { children, ...other } = props;
  return <div ref={ref} {...other}>
    {children}
  </div>
}))