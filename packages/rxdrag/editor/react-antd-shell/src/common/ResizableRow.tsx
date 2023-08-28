import React, { useCallback, useEffect, useRef, useState } from "react";
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
`

export function ResizableRow(props: {
  height?: number | string;
  maxHeight: number;
  minHeight: number;
  children?: React.ReactNode;
  onHeightChange?: (width: number) => void;
  top?: boolean;
  className?: string;
}) {
  const {
    height = 200,
    children,
    maxHeight,
    minHeight,
    onHeightChange,
    top,
    className
  } = props;
  const [realHeight, setRealHeight] = useState(height);
  const [oldHeight, setOldHeight] = useState(height);
  const [draging, setDraging] = useState(false);
  const [firstY, setFirstY] = useState(0);
  const { token } = theme.useToken();

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRealHeight(height);
  }, [height]);

  const handleMouseDown = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      document.body.classList.add("drawer-resizing");
      setDraging(true);
      setFirstY(event.clientY);
      setOldHeight(realHeight);
    },
    [realHeight]
  );

  const handleMouseMove = useCallback(
    (event: MouseEvent) => {
      if (draging && isNumber(oldHeight)) {
        const newHeight = top
          ? oldHeight + (event.clientY - firstY)
          : oldHeight - (event.clientY - firstY);
        if (newHeight >= minHeight && newHeight <= maxHeight) {
          setRealHeight(newHeight);
          onHeightChange && onHeightChange(newHeight);
        }
      }
    },
    [draging, firstY, maxHeight, minHeight, oldHeight, onHeightChange, top]
  );

  const handleMouseup = useCallback(() => {
    document.body.classList.remove("drawer-resizing");
    setDraging(false);
  }, []);

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
        transition: draging ? undefined : "width 0.3s",
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
