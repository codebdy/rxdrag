import { memo } from "react"
import styled from "styled-components"
import { Toolbar } from "../Toolbar/Toolbar"
import { DefaultTopbar } from "../../common/DefaultTopbar"
import { LeftSide } from "../LeftSide"
import { PropertyPanel } from "../PropertyPanel"
import { BottomArea } from "../BottomArea"
import { ShortcutActions } from "../ShortcutActions"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`

const Workspace = styled.div`
  flex:1;
  display: flex;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  flex-flow: column;
`

const CanvasSchell = styled.div`
  padding: 100px;
  flex: 1;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  cursor: grab;
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
        <CanvasSchell>画布</CanvasSchell>
        <BottomArea />
        <ShortcutActions />
        <PropertyPanel />
        <LeftSide />
      </Workspace>
    </Container>
  )
})