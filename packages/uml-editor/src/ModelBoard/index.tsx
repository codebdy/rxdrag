import React from "react"
import { memo } from "react"
import { ResizableColumn } from "../ResizableColumn"
import { ModelContent } from "./ModelContent"
import styled from "styled-components"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  height: calc(100vh - 48px);
  background-color: ${props=>props.theme.token?.colorBgBase};
  .model-tree-shell{
    display: flex;
    flex-flow: column;
    background-color: ${props=>props.theme.token?.colorBgBase};
    border-right: solid 1px ${props=>props.theme.token?.colorBorder};
    width: 100%;
    height: 100%;
    overflow: auto;
  }
  .property-box-area{
    display: flex;
    height: 100%;
    flex-flow: column;
    width: 300px;
    background-color:${props=>props.theme.token?.colorBgBase};
    .property-box{
      flex:1;
      display: flex;
      flex-flow: column;
      height: 0;
      overflow: auto;
      width: 100%;
      .property-pannel{
        padding: 8px 16px;
      }
    }
  }

`

export const ModelBoard = memo((
  props: {
    listWidth?: number,
    modelList?: React.ReactNode,
    toolbox?: React.ReactNode,
    toolbar?: React.ReactNode,
    children?: React.ReactNode,
    propertyBox?: React.ReactNode,
  }
) => {
  const { listWidth, modelList, toolbox, toolbar, children, propertyBox } = props;
  return (
    <Container className="appx-model-board">
      {
        modelList && <ResizableColumn minWidth={50} maxWidth={500} width={listWidth}>
          <div className="model-tree-shell">
            {modelList}
          </div>
        </ResizableColumn>
      }

      <ModelContent toolbox={toolbox} toolbar={toolbar} propertyBox={propertyBox}>
        {children}
      </ModelContent>
    </Container>
  )
})