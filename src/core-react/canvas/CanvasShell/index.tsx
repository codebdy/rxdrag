import { useCanvasWidthLimitsState } from "core-react/hooks/useCanvasWidthLimitsState"
import { useCanvasWidthState } from "core-react/hooks/useCanvasWidthState"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { CanvaseHandler, PositionType } from "../CanvaseHandler"
import "./style.less"

export const CanvasShell = memo((
  props: {
    display: boolean,
    children?: React.ReactNode
  }
) => {
  const { display, children } = props
  const ref = useRef<HTMLDivElement>(null)
  const [startWidth, setStartWidth] = useState(0)
  const [realWidth, setRealWidth] = useCanvasWidthState()
  const [canvasLimits] = useCanvasWidthLimitsState()
  
  useEffect(() => {
    if (canvasLimits) {
      setRealWidth(canvasLimits.maxWidth)
    }
  }, [canvasLimits, setRealWidth])

  const handleDragStart = useCallback(() => {
    setStartWidth(ref.current?.getBoundingClientRect().width || 0)
    ref.current?.classList.remove("transition")
  }, [])

  const handleRightDistanceChange = useCallback((increase: number, totalDistance: number) => {
    let newWidth = startWidth - (totalDistance * 2)
    if (canvasLimits?.maxWidth && newWidth > canvasLimits.maxWidth) {
      newWidth = canvasLimits.maxWidth
    }

    if (canvasLimits?.minWidth && newWidth < canvasLimits.minWidth) {
      newWidth = canvasLimits.minWidth
    }
    setRealWidth(newWidth)
  }, [canvasLimits, setRealWidth, startWidth])


  const handleLeftDistanceChange = useCallback((increase: number, totalDistance: number) => {
    let newWidth = startWidth + (totalDistance * 2)
    if (canvasLimits?.maxWidth && newWidth > canvasLimits.maxWidth) {
      newWidth = canvasLimits.maxWidth
    }

    if (canvasLimits?.minWidth && newWidth < canvasLimits.minWidth) {
      newWidth = canvasLimits.minWidth
    }
    setRealWidth(newWidth)
  }, [canvasLimits, setRealWidth, startWidth])

  const handleDragStop = useCallback(() => {
    ref.current?.classList.add("transition")
  }, [])

  return (
    <div
      ref={ref}
      className="rx-canvas-shell"
      style={{
        width: realWidth ? realWidth : "100%",
        display: display ? "flex" : "none"
      }}
    >
      {children}
      <CanvaseHandler
        position={PositionType.Left}
        onDistanceChange={handleLeftDistanceChange}
        onDragBegin={handleDragStart}
        onDragStop={handleDragStop}
      />
      <CanvaseHandler
        onDistanceChange={handleRightDistanceChange}
        onDragBegin={handleDragStart}
        onDragStop={handleDragStop}
      />
    </div>
  )
})