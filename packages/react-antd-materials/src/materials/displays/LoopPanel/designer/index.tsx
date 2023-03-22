import { LoopPanelProps } from "@rxdrag/react-antd-components";
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