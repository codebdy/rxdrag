import { memo } from "react"
import styled from "styled-components"
import { Divider, Space } from "antd"
import { FlowRemoveButton, FlowUdredoButtons } from "@rxdrag/logicflow-editor-antd5"

const StyledToolbar = styled.div`
  display: flex;
  padding-left: 8px;
  height: 40px;
  align-items: center;
  width: 100%;
`


const Title = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  color: ${props => props.theme?.token?.colorTextSecondary}
`

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
      <Title>
        {
          title
        }
      </Title>
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