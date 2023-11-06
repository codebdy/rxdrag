import { CSSProperties, forwardRef, memo } from "react";

export type DrawerFooterProps = {
  style?: CSSProperties,
  className?: string,
  children?: React.ReactNode,
}

export const DrawerFooter = memo(forwardRef<HTMLDivElement>((props: DrawerFooterProps, ref) => {
  const { children, ...other } = props;

  return <div  ref={ref}
    {...other}
  >
    {children}
  </div>
}))