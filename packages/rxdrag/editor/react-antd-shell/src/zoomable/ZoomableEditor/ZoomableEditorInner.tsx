import { memo, useEffect, useState } from "react"
import styled from "styled-components"
import { PropertyPanel } from "../PropertyPanel"
import { BottomArea } from "../BottomArea"
import { useDesignerEngine } from "@rxdrag/react-core"
import { ILocales } from "@rxdrag/locales"
import { settingLocales } from "../../common"
import { commonLocales } from "../../locales"
import { IDocumentSchema } from "@rxdrag/schema"
import { CanvasResizeDriver, ContainerImpl, DragDropDriver, IDocument, KeyboardDriver, MouseMoveDriver } from "@rxdrag/core"
import { Space } from "antd"
import { DocView } from "../DocView"
import { ZoomableViewport } from "../ZoomableViewport"

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
  schemas: IDocumentSchema[],
  toolbox?: React.ReactNode,
}

export const ZoomableEditorInner = memo((props: ZoomableEditorInnerProps) => {
  const { schemas, locales, toolbox } = props
  const [docs, setDocs] = useState<IDocument[]>([])
  const engine = useDesignerEngine()

  useEffect(() => {
    if (engine) {
      const container = new ContainerImpl(engine, document.body, "$$container$$", [
        DragDropDriver,
        CanvasResizeDriver,
        MouseMoveDriver,
        KeyboardDriver
      ])
      engine.getShell()?.setContainer(container)

      return () => {
        engine.getShell().getContainer()?.destroy()
      }
    }
  }, [engine])

  useEffect(() => {
    const langMgr = engine?.getLocalesManager()
    langMgr?.registerLocales(commonLocales)
    langMgr?.registerLocales(settingLocales)
    locales && langMgr?.registerLocales(locales)
  }, [engine, locales])

  useEffect(() => {
    if (engine) {
      //先清空旧的
      engine.clearDocuments()
      console.log("创建 所有documents")
      const dcs: IDocument[] = []
      for (const schema of schemas) {
        const doc = engine.createDocument(schema)
        engine.getActions().changeActivedDocument(doc.id)
        dcs.push(doc)
      }
      setDocs(dcs)
    }
  }, [engine, schemas])

  return (
    <Workspace>
      <ZoomableViewport
        toolbox={toolbox}
      >
        <Space size={"large"}>
          {
            docs.map(doc => {
              return (
                <DocView key={doc.id} doc={doc} />
              )
            })
          }
        </Space>
      </ZoomableViewport>
      <BottomArea />
      <PropertyPanel />
    </Workspace>
  )
})