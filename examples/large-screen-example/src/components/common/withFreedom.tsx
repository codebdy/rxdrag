import { ReactComponent } from "@rxdrag/react-shared";
import { IChildProps } from "./interfaces";
import { CSSProperties, forwardRef, useMemo } from "react";

//赋予组件可自由移动的能力
export function withFreedom<T = unknown>(WrappedComponent: ReactComponent) {
  return forwardRef<HTMLElement, IChildProps & { style?: CSSProperties } & T>((props, ref) => {
    const { width, height, left, top, zIndex, rotateDeg, style, ...rest } = props
    const newStyle: CSSProperties = useMemo(() => {
      return {
        position: "absolute",
        width,
        height,
        left,
        top,
        zIndex,
        transform: rotateDeg ? `rotate(${rotateDeg})deg` : undefined,
        ...style,
      }
    }, [height, left, rotateDeg, style, top, width, zIndex])

    return <WrappedComponent
      ref={ref}
      style={newStyle}
      {...rest}
    />
  })
}