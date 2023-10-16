import { memo, useState } from "react"
import { PreviewContext, PropertyWidthContext, ToolboxWidthContext, defaultPreviewState, defaultPropertyWidthState,  defaultToolboxState } from "../contexts"

export const ZoomableRoot = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const propState = useState<number>(defaultPropertyWidthState[0])
  const toolboxState = useState<number>(defaultToolboxState[0])
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