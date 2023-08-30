import { memo, useEffect } from "react"
import styled from "styled-components"
import { Toolbar } from "../Toolbar/Toolbar"
import { DefaultTopbar } from "../../common/DefaultTopbar"
import { LeftSide } from "../LeftSide"
import { PropertyPanel } from "../PropertyPanel"
import { BottomArea } from "../BottomArea"
import { ZoomableCanvas } from "../ZoomableCanvas"
import { useDesignerEngine } from "@rxdrag/react-core"
import { ILocales } from "@rxdrag/locales"
import { settingLocales } from "../../common"
import { commonLocales } from "../../locales"
import { LeftSideSecondary } from "../LeftSideSecondary"
import { IDocumentSchema } from "@rxdrag/schema"

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
  height: 0;
`


export type ZoomableEditorInnerProps = {
  topBar?: React.ReactNode,
  locales?: ILocales,
  schemas?: IDocumentSchema[],
}

export const ZoomableEditorInner = memo((props: ZoomableEditorInnerProps) => {
  const { topBar, locales } = props
  const engine = useDesignerEngine()

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    langMgr?.registerLocales(commonLocales)
    langMgr?.registerLocales(settingLocales)
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  return (
    <Container className="zoomable-editor">
      <Toolbar>
        {
          topBar || <DefaultTopbar />
        }
      </Toolbar>
      <Workspace>
        <ZoomableCanvas />
        <BottomArea />
        <PropertyPanel />
        <LeftSide />
        <LeftSideSecondary />
      </Workspace>
    </Container>
  )
})