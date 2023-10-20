import React from "react"
import { memo } from "react"
import { ModelContent } from "./ModelContent"
import styled from "styled-components"
import { ResizableColumn } from "@rxdrag/react-shared"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  height: calc(100vh - 48px);
  .model-tree-shell{
    display: flex;
    flex-flow: column;
    background-color: ${props => props.theme.token?.colorBgBase};
    border-right: solid 1px ${props => props.theme.token?.colorBorderSecondary};
    width: 100%;
    height: 100%;
    overflow: auto;
  }

  box-sizing: border-box;
`

const LeftColumn = styled(ResizableColumn)`
  border: solid 1px;
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
        modelList && <LeftColumn minWidth={50} maxWidth={500} width={listWidth}>
          <div className="model-tree-shell">
            {modelList}
          </div>
        </LeftColumn>
      }

      <ModelContent toolbox={toolbox} toolbar={toolbar} propertyBox={propertyBox}>
        {children}
      </ModelContent>
    </Container>
  )
})