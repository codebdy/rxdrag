import { memo, useState } from "react"
import { PropertyWidthContext, ToolboxWidthContext, defaultWidgetState } from "../contexts"

export const ZoomableRoot = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const propState = useState<number>(defaultWidgetState[0])
  const toolboxState = useState<number>(defaultWidgetState[0])

  return (
    <PropertyWidthContext.Provider value={propState}>
      <ToolboxWidthContext.Provider value={toolboxState}>
        {children}
      </ToolboxWidthContext.Provider>
    </PropertyWidthContext.Provider>
  )
})