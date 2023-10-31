import { Page, PageProps } from "@rxdrag/react-antd-components";
import { forwardRef, memo } from "react"

export const PageDesigner = memo(forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const { children, ...rest } = props;
  return (<Page ref={ref} {...rest}>
    {children}
  </Page>)
}))