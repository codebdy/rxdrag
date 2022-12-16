import { forwardRef, memo } from "react";

export const Blue = memo(forwardRef<HTMLDivElement>((
  props: {
    children?: React.ReactNode
  },
  ref
) => {
  return (
    <div ref={ref} style={{ padding: "16px", margin: "16px", backgroundColor: "rgba(0,0,255,0.4)" }}>
      {
        props.children
      }
    </div>
  )
}))