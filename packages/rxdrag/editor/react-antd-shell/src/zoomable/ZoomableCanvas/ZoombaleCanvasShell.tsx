import { memo, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"

const CanvasSchellContainer = styled.div`
  flex: 1;
  background-color: ${props => props.theme.token?.colorBorderSecondary};
  height: 0;
  overflow: auto;
  user-select: none;
`
interface IPosition {
  x: number,
  y: number,
  scrollLeft: number,
  scrollTop: number
}


export const ZoombaleCanvasShell = memo((
  props: {
    onGrabbing?: (grabbing: boolean) => void
    children?: React.ReactNode,
  }
) => {
  const { onGrabbing, children } = props
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const canvasRef = useRef<HTMLDivElement>(null)

  // const haneldZoomIn = useCallback(() => {
  //   setZoom(zoom => toDecimal(zoom < 3 ? (zoom + 0.1) : zoom))
  // }, [])

  // const haneldZoomOut = useCallback(() => {
  //   setZoom(zoom => toDecimal(zoom > 0.1 ? (zoom - 0.1) : zoom))
  // }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (canvasRef.current) {
      setMousePressedPoint({
        x: e.clientX,
        y: e.clientY,
        scrollLeft: canvasRef.current.scrollLeft,
        scrollTop: canvasRef.current.scrollTop
      })
      onGrabbing?.(true)
    }
  }, [onGrabbing])

  const handleMouseUp = useCallback(() => {
    setMousePressedPoint(undefined)
    onGrabbing?.(false)
  }, [onGrabbing])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!mousePressedPoint) {
      return
    }

    const dragMoveDiff = {
      x: mousePressedPoint.x - e.clientX,
      y: mousePressedPoint.y - e.clientY
    }

    if (canvasRef.current) {
      canvasRef.current.scrollLeft = mousePressedPoint.scrollLeft + dragMoveDiff.x;
      canvasRef.current.scrollTop = mousePressedPoint.scrollTop + dragMoveDiff.y;
    }

  }, [mousePressedPoint])

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [handleMouseMove, handleMouseUp])

  return (
    <CanvasSchellContainer
      ref={canvasRef}
      draggable={false}
      onMouseDown={handleMouseDown}
    >
      {children}
    </CanvasSchellContainer>
  )
})