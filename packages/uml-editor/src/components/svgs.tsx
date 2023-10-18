import React, { memo } from "react";

export interface IconProps {
  size?: string | number,
  color?: string,
}

export const ClassIcon = memo((props: IconProps) => {
  return (
    <svg style={{ width: props.size || "24px", height: props.size || "24px" }} viewBox="0 0 24 24">
      <path
        d="
          M 1,6
          L 14,6
          L 14,19
          L 1,19
          L 1,6
          M 1,11
          L 14,11
        "
        stroke={props.color || "currentColor"}
        strokeWidth="1"
        fill="transparent"
      ></path>
    </svg>
  )
})