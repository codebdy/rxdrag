import React from "react"
import { useCanvasWidthLimitsState, useCanvasWidthState } from "../../hooks"
import { memo, useCallback, useEffect, useRef, useState } from "react"
import { CanvasHandler, PositionType } from "../CanvasHandler"
import styled from "styled-components"

const Shell = styled.div`
  position: relative;
  height: 0;
  flex: 1;
  width: 400px;
  transform: scale3d(1, 1, 1);

  display: flex;
  flex-flow: column;
  &.transition{
    transition: width 0.3s
  }
`

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
    <Shell
      ref={ref}
      className="rx-canvas-shell"
      style={{
        width: realWidth ? realWidth : "100%",
        display: display ? "flex" : "none"
      }}
    >
      {children}
      <CanvasHandler
        position={PositionType.Left}
        onDistanceChange={handleLeftDistanceChange}
        onDragBegin={handleDragStart}
        onDragStop={handleDragStop}
      />
      <CanvasHandler
        onDistanceChange={handleRightDistanceChange}
        onDragBegin={handleDragStart}
        onDragStop={handleDragStop}
      />
    </Shell>
  )
})