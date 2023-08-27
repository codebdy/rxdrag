import { forwardRef, memo } from "react"
import { PageProps, PagePreview } from "./Preview"


export const PageDesigner = memo(forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const { children, ...rest } = props;
  return (<PagePreview ref={ref} {...rest}>
    {children}
  </PagePreview>)
}))