import { forwardRef, memo } from "react";

export type DialogTitleProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DialogTitle = memo(forwardRef<HTMLDivElement>((props: DialogTitleProps, ref) => {
  const { children, ...other } = props;
  return <div ref={ref} {...other}>
    {children}
  </div>
}))