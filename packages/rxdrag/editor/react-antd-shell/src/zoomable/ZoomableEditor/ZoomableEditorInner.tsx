import { memo } from "react"
import styled from "styled-components"
import { Toolbar } from "../Toolbar/Toolbar"
import { DefaultTopbar } from "../../common/DefaultTopbar"
import { Statusbar } from "../Statusbar"
import { LeftSide } from "../LeftSide"
import { ResizableColumn, ResizableRow } from "../../common"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
`

const Workspace = styled.div`
  flex:1;
  display: flex;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
`

const WorkSpaceCenter = styled.div`
  flex:1;
  display: flex;
  flex-flow: column;
`

const CanvasSchell = styled.div`
  flex: 1;
`

export type ZoomableEditorInnerProps = {
  topBar?: React.ReactNode,
}

export const ZoomableEditorInner = memo((props: ZoomableEditorInnerProps) => {
  const { topBar } = props
  return (
    <Container className="zoomable-editor">
      <Toolbar>
        {
          topBar || <DefaultTopbar />
        }
      </Toolbar>
      <Workspace>
        <LeftSide />
        <WorkSpaceCenter>
          <CanvasSchell>画布</CanvasSchell>
          <ResizableRow maxHeight={1000} minHeight={40}>
            控制器
          </ResizableRow>
        </WorkSpaceCenter>
        <ResizableColumn maxWidth={1000} minWidth={300} right>
          属性
        </ResizableColumn>
      </Workspace>
      <Statusbar />
    </Container>
  )
})