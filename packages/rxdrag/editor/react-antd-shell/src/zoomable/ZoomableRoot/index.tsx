import { memo, useState } from "react"
import { PreviewContext, PropertyWidthContext, ToolboxWidthContext, defaultPreviewState, defaultWidgetState } from "../contexts"

export const ZoomableRoot = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const propState = useState<number>(defaultWidgetState[0])
  const toolboxState = useState<number>(defaultWidgetState[0])
  const proviewState = useState<boolean>(defaultPreviewState[0]);

  return (
    <PreviewContext.Provider value={proviewState}>
      <PropertyWidthContext.Provider value={propState}>
        <ToolboxWidthContext.Provider value={toolboxState}>
          {children}
        </ToolboxWidthContext.Provider>
      </PropertyWidthContext.Provider>
    </PreviewContext.Provider>
  )
})