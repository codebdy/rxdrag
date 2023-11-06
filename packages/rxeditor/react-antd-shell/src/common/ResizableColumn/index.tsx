import React, { CSSProperties, memo, useCallback, useEffect, useRef, useState } from "react";
import { isNumber } from "lodash";
import "./style.css";
import { theme } from "antd";
import styled from "styled-components";
import classNames from "classnames";
import { useDesignerEngine } from "@rxdrag/react-core";
import { MouseMoveEvent, MouseUpEvent } from "@rxdrag/core";

const handlerWidth = 5;

const Container = styled.div`
  display: flex;
  align-items:stretch;
  position:relative;
  padding: 0;
  box-sizing: border-box;
`

export const ResizableColumn = memo(
  (props: {
    width?: number | string;
    maxWidth?: number;
    minWidth?: number;
    children?: React.ReactNode;
    style?: CSSProperties;
    onWidthChange?: (width: number) => void;
    right?: boolean;
    hidden?: boolean;
    className?: string;
  }) => {
    const {
      width = 260,
      children,
      style,
      maxWidth = 0,
      minWidth = 0,
      onWidthChange,
      right,
      hidden,
      className,
    } = props;
    const [realWidth, setRealWidth] = useState(width);
    const [oldWidth, setOldWidth] = useState(width);
    const [draging, setDraging] = useState(false);
    const [firstX, setFirstX] = useState(0);
    const { token } = theme.useToken();
    const ref = useRef<HTMLDivElement>(null);
    const engine = useDesignerEngine()
    const firstXRef = useRef(firstX)
    firstXRef.current = firstX
    const dragingRef = useRef(draging)
    dragingRef.current = draging
    const oldWidthRef = useRef(oldWidth)
    oldWidthRef.current = oldWidth

    useEffect(() => {
      setRealWidth(width);
    }, [width]);

    const handleMouseDown = useCallback(
      (event: React.MouseEvent<HTMLElement>) => {
        document.body.classList.add("drawer-resizing");
        setDraging(true);
        setFirstX(event.screenX);
        setOldWidth(realWidth);
      },
      [realWidth]
    );

    const handleMouseMove = useCallback(
      (event: MouseEvent) => {
        const draging = dragingRef.current
        const firstX = firstXRef.current
        const oldWidth = oldWidthRef.current
        if (draging && isNumber(oldWidth)) {
          const newWidth = right
            ? (oldWidth as number) - (event.screenX - firstX)
            : (oldWidth as number) + (event.screenX - firstX);
          if (newWidth > maxWidth || newWidth < minWidth) {
            return
          }
          setRealWidth(newWidth);
          onWidthChange && onWidthChange(newWidth);
        }
      },
      [maxWidth, minWidth, onWidthChange, right]
    );

    const handleMouseup = useCallback(() => {
      document.body.classList.remove("drawer-resizing");
      const realWidth = ref.current?.getBoundingClientRect().width
      if (realWidth && draging) {
        setRealWidth(realWidth);
        onWidthChange && onWidthChange(realWidth);
      }
      setDraging(false);
    }, [draging, onWidthChange]);


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
        ref={ref}
        className={classNames(className, "resizeable-column")}
        style={{
          //height: "100%",
          width: hidden ? 0 : realWidth,
          maxWidth: maxWidth,
          minWidth: minWidth,
          transition: draging ? undefined : "all 0.3s",
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
              ? token.colorPrimary
              : "transparent",
            zIndex: 2,
            opacity: 0.8,
          }}
          onMouseDown={handleMouseDown}
        ></div>
      </Container>
    );
  }
);
