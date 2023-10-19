import { memo } from "react"
import { Divider, Space } from "antd"
import { FlowRemoveButton, FlowUdredoButtons } from "@rxdrag/logicflow-editor-antd5"
import styled from "styled-components";

export const StyledToolbar = styled.div`
  display: flex;
  padding: 0 8px;
  height: 48px;
  align-items: center;
  width: 100%;
  background-color: ${props => props.theme.token?.colorBgBase};
  border-top: solid 1px ${props => props.theme.token?.colorBorderSecondary};
  border-bottom: ${props => props.theme.token?.colorBorderSecondary} solid 1px;
  box-sizing: border-box;
`;


export const ToolbarTitle = styled.div`
  flex:1;
  display: flex;
  align-items: center;
  color: ${props => props.theme?.token?.colorTextSecondary};
  .text{
    margin-left: 4px;
  }
`;


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