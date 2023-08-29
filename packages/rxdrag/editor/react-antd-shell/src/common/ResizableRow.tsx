import React, { CSSProperties, useCallback, useEffect, useRef, useState } from "react";
import "./ResizableColumn/style.css"

import { isNumber } from "lodash";
import { theme } from "antd";
import styled from "styled-components";
import classNames from "classnames";

const handlerHeight = 5;

const Container = styled.div`
  width:100%;
  display: flex;
  align-items:stretch;
  position:relative;
  padding: 0;
`

export function ResizableRow(props: {
  height?: number | string;
  maxHeight?: number | string;
  minHeight?: number | string;
  children?: React.ReactNode;
  onHeightChange?: (width: number) => void;
  top?: boolean;
  className?: string;
  style?: CSSProperties
}) {
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
  const dragingRef = useRef(draging)
  dragingRef.current = draging

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRealHeight(height);
  }, [height]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      document.body.classList.add("drawer-resizing");
      //setDraging(true);
      setFirstY(event.clientY);
      setOldHeight(realHeight);
    },
    [realHeight]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (!dragingRef.current && firstY !== undefined && Math.abs(event.clientY - firstY) > 5) {
        setDraging(true);
        return
      }
      if (dragingRef.current && isNumber(oldHeight) && firstY !== undefined) {
        const newHeight = top
          ? oldHeight + (event.clientY - firstY)
          : oldHeight - (event.clientY - firstY);
        setRealHeight(newHeight);
        onHeightChange && onHeightChange(newHeight);
      }
    },
    [firstY, oldHeight, onHeightChange, top]
  );

  const handleMouseup = useCallback(() => {
    document.body.classList.remove("drawer-resizing");
    const realHeight = ref.current?.getBoundingClientRect().height
    if (realHeight && draging) {
      setRealHeight(realHeight);
      onHeightChange && onHeightChange(realHeight);
    }
    setDraging(false);
    setFirstY(undefined)
  }, [draging, onHeightChange]);

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseup);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseup);
    };
  }, [handleMouseMove, handleMouseup]);

  return (
    <Container
      ref={ref}
      className={classNames(className, "resizable-row")}
      style={{
        height: realHeight,
        minHeight: minHeight,
        maxHeight: maxHeight,
        transition: draging ? undefined : "height 0.3s, width 0.3s",
        ...style
      }}
    >
      <div
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
}
