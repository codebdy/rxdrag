import React from "react";
import { memo } from "react"
import styled from "styled-components";
import { ILogicMetas } from "../interfaces";
import { FlowToolbar } from "./FlowToolbar";
import { FlowToolbox } from "./FlowToolbox";
import { FlowPropertyBox } from "./FlowPropertyBox";
import { ResizableColumn } from "./ResizableColumn";
import { FlowCanvas } from "./FlowCanvas";

const EditorShell = styled.div`
  display: flex;
  flex:1;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;
`

const CenterArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
  height: 100%;
  box-sizing: border-box;
`
const OperateArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  width: 100%;
  height: 0;
  box-sizing: border-box;
`

const RightArea = styled(ResizableColumn)`
  width: 280px;
  border-left: ${props => props.theme.token?.colorBorderSecondary}  solid 1px;
  display: flex;
  flex-flow: column;
`

export type LogicFlowEditorInnerProps = {
  value?: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  toolbox?: React.ReactNode,
  toolbar?: React.ReactNode,
  propertyBox?: React.ReactNode,
  children?: React.ReactNode,
}

export const LogicFlowEditorInner = memo((
  props: LogicFlowEditorInnerProps
) => {
  const { value, onChange, toolbox, toolbar, propertyBox, children } = props

  return (
    <EditorShell>
      <CenterArea>
        {
          toolbar &&
          <FlowToolbar>
            {toolbar}
          </FlowToolbar>
        }
        <OperateArea>
          {
            toolbox && <FlowToolbox
              minWidth={100}
              maxWidth={500}
            >
              {toolbox}
            </FlowToolbox>
          }
          <FlowCanvas
            value = {value}
            onChange={onChange}
          >
            {children}
          </FlowCanvas>
          <RightArea
            right
            maxWidth={500}
            minWidth={200}
          >
            <FlowPropertyBox>
              {propertyBox}
            </FlowPropertyBox>
          </RightArea>
        </OperateArea>
      </CenterArea>
    </EditorShell>
  )
})