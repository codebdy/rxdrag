import React from "react"
import { useThemeMode, useDesignerEngine } from "../../hooks"
import { memo, useCallback, useEffect, useState } from "react"
import { AUX_BACKGROUND_COLOR, MouseMoveEvent, MouseUpEvent } from "@rxdrag/core"

import styled from "styled-components"
import "./style.css"

const Container = styled.div`
  position: absolute;
  top: 0;
  left: -4px;
  width: 4px;
  height: 100%;
  cursor: w-resize;
  display: flex;
  justify-content: flex-start;
  align-items: stretch;
  &:hover{
    .colored-handler.light{
      background-color: #ccc;
    }
    .colored-handler.dark{
      background-color: #666;
    }
  }

  .colored-handler{
    width: 4px;
  }
`

export enum PositionType {
  Left = "left",
  Right = "right"
}

export const CanvasHandler = memo((
  props: {
    position?: PositionType,
    onDistanceChange: (increase: number, totalDistance: number) => void,
    onDragBegin?: () => void,
    onDragStop?: () => void,
  }
) => {
  const { position = PositionType.Right, onDistanceChange, onDragBegin, onDragStop } = props
  const [dragging, setDragging] = useState(false);
  const [firstX, setFirstX] = useState(0);
  const [lastX, setLastX] = useState(0);
  const themeMode = useThemeMode()
  const engine = useDesignerEngine()
  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (dragging) {
        onDistanceChange(lastX - event.screenX, firstX - event.screenX)
        setLastX(event.screenX)
      }
    },
    [dragging, firstX, lastX, onDistanceChange]
  );

  const handleMouseup = useCallback(() => {
    document.body.classList.remove("canvas-resizing");
    setDragging(false)
    onDragStop?.()
  }, [onDragStop]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      document.body.classList.add("canvas-resizing");
      setDragging(true)
      setFirstX(event.screenX);
      setLastX(event.screenX);

      onDragBegin?.()
    },
    [onDragBegin]
  );

  const handleShellMouseMove = useCallback(
    (event: MouseMoveEvent) => {
      if (dragging) {
        const x = event.originalEvent.screenX || 0
        onDistanceChange(lastX - x, firstX - x)
        setLastX(x)
      }
    },
    [dragging, firstX, lastX, onDistanceChange]
  );

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseup);
    const unsubMouseMove = engine?.getShell().subscribeTo(MouseMoveEvent.Name, handleShellMouseMove)
    const unsubMouseUp = engine?.getShell().subscribeTo(MouseUpEvent.Name, handleMouseup)
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseup);
      unsubMouseMove?.()
      unsubMouseUp?.()
    }
  }, [engine, handleMouseMove, handleMouseup, handleShellMouseMove])

  return (
    <Container className={position}
      onMouseDown={handleMouseDown}
    >
      <div
        className={"colored-handler" + " " + themeMode}
        style={{ backgroundColor: dragging ? AUX_BACKGROUND_COLOR : undefined }}
      ></div>
    </Container>
  )
})