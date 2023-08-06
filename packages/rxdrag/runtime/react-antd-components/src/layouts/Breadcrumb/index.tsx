import { forwardRef, memo } from "react"
import { Breadcrumb as AntdBreadcrumb } from "antd"

export type BreadcrumbProps = {
  children?: React.ReactNode
}

export const Breadcrumb = memo(forwardRef<HTMLDivElement, BreadcrumbProps>((
  props, ref) => {
  return (
    <AntdBreadcrumb {...props}
      items={[
        {
          title: 'Home',
        },
        {
          title: <a href="">Application Center</a>,
        },
        {
          title: <a href="">Application List</a>,
        },
        {
          title: 'An Application',
        },
      ]}
    />
  )
}))