import { Collapse as AntdCollapse } from "antd"
import { memo } from "react"

const { Panel } = AntdCollapse;

export const CollapsePanel = memo((
  props: {
    title?: string,
    children?: React.ReactNode,
    defaultExpand?: boolean,
  }
) => {
  const { title, children, defaultExpand, ...other } = props;
  return (
    <AntdCollapse ghost defaultActiveKey={defaultExpand ? ['1'] : undefined} expandIconPosition="end" {...other}>
      <Panel header={title} key="1">
        {children}
      </Panel>
    </AntdCollapse>
  )
})