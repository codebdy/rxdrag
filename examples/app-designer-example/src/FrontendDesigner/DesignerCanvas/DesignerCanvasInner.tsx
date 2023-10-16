import { memo } from "react"
import { useParams } from "react-router-dom"
import { LayoutPart } from "../../interfaces"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { Canvas, useIFrameParams } from "@rxdrag/react-core"
import { ModuleCanvas } from "./ModuleCanvas"

export const DesignerCanvasInner = memo(() => {
  const appFront = useAppFrontend()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { showFrame } = (useIFrameParams() as any) || {}
  const { layoutPart } = useParams()


  return (
    appFront?.frameSchema && layoutPart === LayoutPart.module && showFrame
      ? <ModuleCanvas frameSchema={appFront?.frameSchema} />
      : <Canvas />
  )
})