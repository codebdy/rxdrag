import { forwardRef, memo } from "react"
import {Breadcrumb as AntdBreadcrumb} from "antd"
import { HomeOutlined } from "@ant-design/icons"

export type BreadcrumbProps = {
  children?: React.ReactNode
}

export const Breadcrumb = memo(forwardRef<HTMLDivElement, BreadcrumbProps>((
  props, ref) => {
  return (
    <AntdBreadcrumb {...props}>
      <AntdBreadcrumb.Item>
        <HomeOutlined />
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>
        <span>Application List</span>
      </AntdBreadcrumb.Item>
      <AntdBreadcrumb.Item>Application</AntdBreadcrumb.Item>
    </AntdBreadcrumb>
  )
}))