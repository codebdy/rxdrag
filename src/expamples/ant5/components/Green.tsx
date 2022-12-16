import { forwardRef, memo } from "react";

export const Green = memo(forwardRef<HTMLDivElement>((
  props: {
    children?: React.ReactNode
  },
  ref
) => {
  return (
    <div ref={ref} style={{ padding: "16px", margin: "16px", backgroundColor: "rgba(0,255,0,0.3)", }}>
      {
        props.children
      }
    </div>
  )
}))