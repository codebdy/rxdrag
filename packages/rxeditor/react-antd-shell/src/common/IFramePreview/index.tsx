import { IReactComponents } from "@rxdrag/react-shared"
import { memo } from "react"
import { IFramePreviewInner } from "./IFramePreviewInner"
import { IPreviewProxy } from "@rxdrag/react-core"

export const IFramePreview = memo((
  props: {
    components: IReactComponents,
  }
) => {
  const { components } = props
  return (
    <IPreviewProxy components={components}>
      <IFramePreviewInner />
    </IPreviewProxy>
  )
})