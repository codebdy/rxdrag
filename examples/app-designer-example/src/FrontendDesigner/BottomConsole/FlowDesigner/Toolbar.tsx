import { memo } from "react"
import { Divider, Space } from "antd"
import { FlowRemoveButton, FlowUdredoButtons } from "@rxdrag/logicflow-editor-antd5"
import { StyledToolbar } from "../common/StyledToolbar"
import { ToolbarTitle } from "../common/ToolbarTitle"

export const Toolbar = memo((
  props: {
    right?: React.ReactNode,
    title?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  const { title, children } = props;

  return (
    <StyledToolbar className="logicflow-editor-antd5-toolbar">
      <ToolbarTitle>
        {
          title
        }
      </ToolbarTitle>
      <Space>
        <FlowUdredoButtons />
        <Divider type="vertical" />
        <FlowRemoveButton />
      </Space>
      {
        children
      }
    </StyledToolbar>
  )
})