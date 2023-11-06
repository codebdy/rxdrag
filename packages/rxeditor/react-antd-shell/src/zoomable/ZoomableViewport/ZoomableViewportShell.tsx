import { memo, useCallback, useEffect, useRef, useState } from "react"
import styled from "styled-components"
import { ShortcutActions } from "../ShortcutActions"
import "./style.css"
import { MouseMoveEvent, MouseUpEvent } from "@rxdrag/core"
import { useDesignerEngine } from "@rxdrag/react-core"

const ViewportSchellContainer = styled.div`
  position: relative;
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

const defaultScrollLeft = 460;

export const ZoomableViewportShell = memo((
  props: {
    zoom: number,
    onZoomChange: (zoom: number) => void
    onGrabbing?: (grabbing: boolean) => void
    children?: React.ReactNode,
  }
) => {
  const { zoom, onZoomChange, onGrabbing, children } = props
  const [scrolled, setScrolled] = useState(false)
  const engine = useDesignerEngine()
  const [mousePressedPoint, setMousePressedPoint] = useState<IPosition>()
  const canvasRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.scrollLeft = defaultScrollLeft;
    }
  }, [])

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (canvasRef.current) {
      document.body.classList.add("canvas-moving");
      setMousePressedPoint({
        x: e.screenX,
        y: e.screenY,
        scrollLeft: canvasRef.current.scrollLeft,
        scrollTop: canvasRef.current.scrollTop
      })
      onGrabbing?.(true)
    }
  }, [onGrabbing])

  const handleMouseUp = useCallback(() => {
    document.body.classList.remove("canvas-moving");
    setMousePressedPoint(undefined)
    onGrabbing?.(false)
  }, [onGrabbing])

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!mousePressedPoint) {
      return
    }

    const dragMoveDiff = {
      x: mousePressedPoint.x - e.screenX,
      y: mousePressedPoint.y - e.screenY
    }

    if (canvasRef.current) {
      canvasRef.current.scrollLeft = mousePressedPoint.scrollLeft + dragMoveDiff.x;
      canvasRef.current.scrollTop = mousePressedPoint.scrollTop + dragMoveDiff.y;
    }

  }, [mousePressedPoint])

  const handleShellMouseMove = useCallback(
    (e: MouseMoveEvent) => {
      handleMouseMove(e.originalEvent)
    },
    [handleMouseMove]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove)
    document.addEventListener("mouseup", handleMouseUp)
    const unsubMouseMove = engine?.getShell().subscribeTo(MouseMoveEvent.Name, handleShellMouseMove)
    const unsubMouseUp = engine?.getShell().subscribeTo(MouseUpEvent.Name, handleMouseUp)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
      unsubMouseMove?.()
      unsubMouseUp?.()
    }
  }, [engine, handleMouseMove, handleMouseUp, handleShellMouseMove])


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
    <>
      <ViewportSchellContainer
        className="viewport-shell-container"
        ref={canvasRef}
        draggable={false}
        onMouseDown={handleMouseDown}
        onScroll={handleScroll}
      >
        {children}
      </ViewportSchellContainer>
      <ShortcutActions
        zoom={zoom}
        onZoomChange={onZoomChange}
        scrolled={scrolled}
        onResetScroll={handleResetScroll}
      />
    </>
  )
})