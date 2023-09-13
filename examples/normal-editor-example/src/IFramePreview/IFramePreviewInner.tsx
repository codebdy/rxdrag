import { DocumentRoot, Preview, useActivedDocument } from "@rxdrag/react-core"
import { ControllerFactories, usePreviewComponents } from "@rxdrag/react-runner"
import { memo } from "react"

export const IFramePreviewInner = memo((
  props: {
    controllerFactories?: ControllerFactories,
  }
) => {
  const { controllerFactories = {} } = props;
  const doc = useActivedDocument()
  const components = usePreviewComponents()
  return (
    doc
      ? <DocumentRoot doc={doc}>
        <Preview components={components} controllerFactories={controllerFactories} />
      </DocumentRoot>
      : <></>
  )
})