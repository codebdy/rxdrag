import React from "react"
import { Collapse as AntdCollapse } from "antd"
import { memo } from "react"

export const CollapsePanel = memo((
  props: {
    title?: string,
    children?: React.ReactNode,
    defaultExpand?: boolean,
    onChange?: () => void,
  }
) => {
  //要滤除onChange事件
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { title, children, defaultExpand, onChange, ...other } = props;
  return (
    <AntdCollapse
      ghost defaultActiveKey={defaultExpand ? ['1'] : undefined}
      expandIconPosition="end"
      items={[
        {
          key : "1",
          label: title,
          children:children,
          forceRender: true,
        }
      ]}
      {...other}
    />
  )
})