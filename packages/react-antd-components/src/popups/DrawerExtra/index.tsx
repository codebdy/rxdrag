import { forwardRef, memo } from "react";

export type DrawerExtraProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DrawerExtra = memo(forwardRef<HTMLDivElement>((props: DrawerExtraProps, ref) => {
  const { children, ...other } = props;
  return <div ref={ref} {...other}>
    {children}
  </div>
}))