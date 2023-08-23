import { Preview, useActivedDocument, useComponents } from "@rxdrag/react-core"
import { ControllerFactories } from "@rxdrag/react-runner"
import { memo } from "react"

export const IFramePreviewInner = memo((
  props: {
    controllerFactories?: ControllerFactories,
  }
) => {
  const { controllerFactories = {} } = props;
  const doc = useActivedDocument()
  const components = useComponents()
  return (
    doc
      ? <Preview doc={doc} components={components} controllerFactories={controllerFactories} />
      : <></>
  )
})