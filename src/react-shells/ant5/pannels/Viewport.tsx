import { CSSProperties, ForwardedRef, forwardRef, memo } from "react"

const viewportStyle: CSSProperties = {
  flex: 1,
  padding: '0px 16px',
  height: 0,
  width: "100%",
  display: "flex",
  flexFlow: "column",
  boxSizing: "border-box",
  alignItems: "center",
}

export interface ViewportProps {
  children?: React.ReactNode
}

export const Viewport = memo(forwardRef((props: ViewportProps, ref: ForwardedRef<HTMLDivElement>) => {
  return (
    <div ref={ref} style={viewportStyle} {...props}>
    </div>
  )
}))