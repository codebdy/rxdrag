import { memo } from "react"
import styled from "styled-components"
import { Divider, Space } from "antd"
import { FlowUdredoButtons } from "./FlowUdredoButtons"
import { FlowRemoveButton } from "./FlowRemoveButton"

const StyledToolbar = styled.div`
  display: flex;
  padding: 0 0px;
  height: 40px;
  align-items: center;
  width: 100%;
`


const ToolbarCenter = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const FlowToolbar = memo((
  props: {
    right?: React.ReactNode,
    children?: React.ReactNode,
  }
) => {
  const { right, children } = props;

  return (
    <StyledToolbar className="logicflow-editor-antd5-toolbar">
      <Space>
        <FlowUdredoButtons />
        <Divider type="vertical" />
        <FlowRemoveButton />
      </Space>
      <ToolbarCenter>
        {
          children
        }
      </ToolbarCenter>
      {
        right
      }
    </StyledToolbar>
  )
})