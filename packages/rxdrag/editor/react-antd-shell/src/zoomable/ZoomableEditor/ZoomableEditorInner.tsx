import { memo, useEffect } from "react"
import styled from "styled-components"
import { PropertyPanel } from "../PropertyPanel"
import { BottomArea } from "../BottomArea"
import { ZoomableCanvas } from "../ZoomableCanvas"
import { useDesignerEngine } from "@rxdrag/react-core"
import { ILocales } from "@rxdrag/locales"
import { settingLocales } from "../../common"
import { commonLocales } from "../../locales"
import { IDocumentSchema } from "@rxdrag/schema"


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
  locales?: ILocales,
  schemas?: IDocumentSchema[],
}

export const ZoomableEditorInner = memo((props: ZoomableEditorInnerProps) => {
  const { locales } = props
  const engine = useDesignerEngine()

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    langMgr?.registerLocales(commonLocales)
    langMgr?.registerLocales(settingLocales)
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  return (
    <Workspace>
      <ZoomableCanvas />
      <BottomArea />
      <PropertyPanel />
    </Workspace>
  )
})