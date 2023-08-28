import { memo, useState } from "react"
import { PropertyWidthContext, defaultPropertyState } from "../contexts"

export const ZoomableRoot = memo((props: {
  children?: React.ReactNode
}) => {
  const { children } = props;
  const propState = useState<number>(defaultPropertyState[0])

  return (
    <PropertyWidthContext.Provider value={propState}>
      {children}
    </PropertyWidthContext.Provider>
  )
})