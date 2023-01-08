import { forwardRef, memo } from "react";
import "./style.less"

export type DrawerTitleProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DrawerTitle = memo(forwardRef<HTMLDivElement>((props: DrawerTitleProps, ref) => {
  const { children, ...other } = props;
  return <div className="drawer-title" ref={ref} {...other}>
    {children}
  </div>
}))