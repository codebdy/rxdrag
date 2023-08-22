import { memo } from "react"
import { ComponentTreeWidget } from "../ComponentTreeWidget"
import { useDocument } from "../hooks"

export const Canvas = memo(() => {
  //这样不行
  const doc = useDocument()
  return (
    <ComponentTreeWidget doc={doc} />
  )
})