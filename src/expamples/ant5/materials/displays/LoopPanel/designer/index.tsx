import { LoopPanelProps } from "expamples/ant5/components/displays/LoopPanel";
import { forwardRef, memo } from "react"


export const LoopPanelDesigner = memo(forwardRef<HTMLDivElement, LoopPanelProps>((props, ref) => {
  const { children } = props;
  return (
    <div ref={ref}>
      {
        children
      }
    </div>
  )
}))