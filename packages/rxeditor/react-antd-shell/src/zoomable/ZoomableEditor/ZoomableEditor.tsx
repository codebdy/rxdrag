import { memo } from "react"
import { ZoomableEditorInner, ZoomableEditorInnerProps } from "./ZoomableEditorInner"
import "./style.css"
import { ZoomableRoot } from "../ZoomableRoot";

export type ZoomableEditorProps = ZoomableEditorInnerProps

export const ZoomableEditor = memo((props: ZoomableEditorProps) => {
  return (
    <ZoomableRoot>
      <ZoomableEditorInner {...props} />
    </ZoomableRoot>
  )
})