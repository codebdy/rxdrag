import React from "react";
import { CSSProperties } from "styled-components";

export const SvgStringIcon = React.forwardRef((
  props: {
    style?: CSSProperties,
    icon?: string,
    size?: number,
    color?: string,
  },
  ref: any
) => {
  const { icon, size = 24, style, color, ...rest } = props;

  return (
    <div
      style={{
        width: size,
        height: size,
        color: color,
        ...style,
      }}
      {...rest}
      ref={ref}
      dangerouslySetInnerHTML={{
        __html: icon || ""
      }}
    >
    </div>
  )
})