import { Preview } from "@rxdrag/react-core"
import { usePreviewComponents } from "@rxdrag/react-runner"
import { memo } from "react"

export const IFramePreviewInner = memo(() => {
  const components = usePreviewComponents()
  return (
    <Preview components={components} />
  )
})