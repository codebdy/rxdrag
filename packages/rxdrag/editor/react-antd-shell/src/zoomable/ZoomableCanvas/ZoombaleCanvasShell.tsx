import { memo, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ShortcutActions } from "../ShortcutActions"

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

const defaultScrollLeft = 264;

export const ZoombaleCanvasShell = memo((
  props: {
    zoom: number,
    onZoomChange: (zoom: number) => void
    onGrabbing?: (grabbing: boolean) => void
    children?: React.ReactNode,
  }
) => {
  const { zoom, onZoomChange, onGrabbing, children } = props
  const [scrolled, setScrolled] = useState(false)

  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollLeft = defaultScrollLeft;
    }
  }, [])

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

  const handleScroll = useCallback((e: React.UIEvent<HTMLElement>) => {
    if (e.currentTarget.scrollTop > 60 || (e.currentTarget.scrollLeft > defaultScrollLeft + 60) || e.currentTarget.scrollLeft < (defaultScrollLeft - 60)) {
      setScrolled(true)
    } else {
      setScrolled(false)
    }
  }, [])

  const handleResetScroll = useCallback(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollLeft = defaultScrollLeft;
      canvasRef.current.scrollTop = 0;
    }
  }, [])

  return (
    <CanvasSchellContainer
      ref={canvasRef}
      draggable={false}
      onMouseDown={handleMouseDown}
      onScroll={handleScroll}
    >
      {children}
      <ShortcutActions
        zoom={zoom}
        onZoomChange={onZoomChange}
        scrolled={scrolled}
        onResetScroll={handleResetScroll}
      />
    </CanvasSchellContainer>
  )
})