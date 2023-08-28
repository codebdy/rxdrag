import { memo } from "react"
import { ZoomableEditorInner, ZoomableEditorInnerProps } from "./ZoomableEditorInner"

export const ZoomableEditor = memo((props: ZoomableEditorInnerProps) => {
  const { ...other } = props
  return (
    <>
      <ZoomableEditorInner {...other} />
    </>
  )
})