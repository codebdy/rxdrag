import React, { CSSProperties, forwardRef, useCallback, useEffect, useRef, useState } from "react";
import "./ResizableColumn/style.css"

import { isNumber } from "lodash";
import { theme } from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { useDesignerEngine } from "@rxdrag/react-core";
import { MouseMoveEvent, MouseUpEvent } from "@rxdrag/core";

const handlerHeight = 5;

const Container = styled.div`
  width:100%;
  display: flex;
  align-items:stretch;
  position:relative;
  padding: 0;
  box-sizing: border-box;
`

export type ResizableRowProps = {
  height?: number;
  maxHeight?: number | string;
  minHeight?: number | string;
  children?: React.ReactNode;
  onHeightChange?: (width: number) => void;
  top?: boolean;
  className?: string;
  style?: CSSProperties
}

export const ResizableRow = forwardRef<HTMLDivElement, ResizableRowProps>((props, ref) => {
  const {
    height = 200,
    children,
    maxHeight,
    minHeight,
    onHeightChange,
    top,
    className,
    style
  } = props;
  const [realHeight, setRealHeight] = useState(height);
  const [oldHeight, setOldHeight] = useState(height);
  const [draging, setDraging] = useState(false);
  const [firstY, setFirstY] = useState<number>();
  const { token } = theme.useToken();
  const engine = useDesignerEngine()
  const dragingRef = useRef(draging)
  dragingRef.current = draging
  const oldHeightRef = useRef(oldHeight)
  oldHeightRef.current = oldHeight
  const firstYRef = useRef(firstY)
  firstYRef.current = firstY

  const shellRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRealHeight(height);
  }, [height]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      document.body.classList.add("drawer-resizing");
      //setDraging(true);
      setFirstY(event.screenY);
      setOldHeight(realHeight);
    },
    [realHeight]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      const firstY = firstYRef.current
      if (!dragingRef.current && firstY !== undefined && Math.abs(event.screenY - firstY) > 5) {
        setDraging(true);
        return
      }
      const oldHeight = oldHeightRef.current;
      if (dragingRef.current && isNumber(oldHeight) && firstY !== undefined) {
        const newHeight = top
          ? oldHeight + (event.screenY - firstY)
          : oldHeight - (event.screenY - firstY);
        setRealHeight(newHeight);
        onHeightChange && onHeightChange(newHeight);
      }
    },
    [onHeightChange, top]
  );

  const handleMouseup = useCallback(() => {
    document.body.classList.remove("drawer-resizing");
    const realHeight = shellRef.current?.getBoundingClientRect().height
    if (realHeight && draging) {
      setRealHeight(realHeight);
      onHeightChange && onHeightChange(realHeight);
    }
    setDraging(false);
    setFirstY(undefined)
  }, [draging, onHeightChange]);

  const handleShellMouseMove = useCallback(
    (e: MouseMoveEvent) => {
      handleMouseMove(e.originalEvent)
    },
    [handleMouseMove]
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
    };
  }, [engine, handleMouseMove, handleMouseup, handleShellMouseMove]);


  return (
    <Container
      ref={shellRef}
      className={classNames(className, "resizable-row")}
      style={{
        height: realHeight,
        minHeight: minHeight,
        maxHeight: maxHeight,
        transition: draging ? undefined : "all 0.3s",
        ...style
      }}
    >
      <div
        ref={ref}
        style={{
          flex: 1,
          minHeight: realHeight,
          width: realHeight,
          height: "100%",
          display: "flex",
          flexFlow: "column",
          overflowX: "hidden",
        }}
      >
        {children}
      </div>
      <div
        style={{
          position: "absolute",
          width: "100%",
          bottom: top ? 0 : "auto",
          top: top ? "auto" : 0,
          left: 0,
          cursor: "s-resize",
          height: handlerHeight,
          backgroundColor: draging
            ? token.colorPrimary
            : "transparent",
          zIndex: 2,
        }}
        onMouseDown={handleMouseDown}
      ></div>
    </Container>
  );
})
