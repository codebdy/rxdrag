import React, { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import "./style.less";
import { isNum } from "@rxdrag/shared";
export const PRIMARY_COLOR = "#5d78ff";
const handlerWidth = 5;

export const ResizableColumn = memo(
  (props: {
    width?: number | string;
    maxWidth: number;
    minWidth: number;
    children?: React.ReactNode;
    style?: CSSProperties;
    onWidthChange?: (width: number) => void;
    right?: boolean;
    hidden?: boolean;
  }) => {
    const {
      width = 260,
      children,
      style,
      maxWidth,
      minWidth,
      onWidthChange,
      right,
      hidden,
    } = props;
    const [realWidth, setRealWidth] = useState(width);
    const [oldWidth, setOldWidth] = useState(width);
    const [draging, setDraging] = useState(false);
    const [firstX, setFirstX] = useState(0);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
      setRealWidth(width);
    }, [width]);

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        document.body.classList.add("drawer-resizing");
        setDraging(true);
        setFirstX(event.clientX);
        setOldWidth(realWidth);
      },
      [realWidth]
    );

    const handleMouseMove = useCallback(
      (event: MouseEvent) => {
        if (draging && isNum(oldWidth)) {
          const newWidth = right
            ? (oldWidth as number) - (event.clientX - firstX)
            : (oldWidth as number) + (event.clientX - firstX);
          if (newWidth >= minWidth && newWidth <= maxWidth) {
            //setLastX(event.x);
            setRealWidth(newWidth);
            onWidthChange && onWidthChange(newWidth);
          }
        }
      },
      [draging, firstX, maxWidth, minWidth, oldWidth, onWidthChange, right]
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
      <div
        ref={ref}
        style={{
          //height: "100%",
          width: hidden ? 0 : realWidth,
          boxSizing: "border-box",
          display: "flex",
          alignItems: "stretch",
          position: "relative",
          transition: draging ? undefined : "width 0.3s",
          ...style,
        }}
      >
        <div
          style={{
            flex: 1,
            minWidth: hidden ? 0 : realWidth,
            width: hidden ? 0 : realWidth,
            height: "100%",
            display: "flex",
            flexFlow: "column",
            overflowX: "hidden",
            transition: draging ? undefined : "all 0.3s",
          }}
        >
          {children}
        </div>
        <div
          style={{
            position: "absolute",
            height: "100%",
            top: 0,
            right: right ? "auto" : -handlerWidth / 2,
            left: right ? -handlerWidth / 2 : "auto",
            cursor: "w-resize",
            width: handlerWidth,
            backgroundColor: draging
              ? PRIMARY_COLOR
              : "transparent",
            zIndex: 2,
            opacity: 0.8,
          }}
          onMouseDown={handleMouseDown}
        ></div>
      </div>
    );
  }
);
