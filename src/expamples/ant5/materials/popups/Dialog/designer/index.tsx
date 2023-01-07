import { CSSProperties, forwardRef, memo } from "react"

export type DialogProps = {
  style?: CSSProperties,
  actionComponent?: React.ReactElement,
}

export const DialogDesigner = memo(forwardRef<HTMLDivElement>((props: DialogProps, ref) => {
  const { actionComponent, style, ...other } = props
  return (
    <div ref={ref} style={{ display: "inline-block", position:"relative", ...style }}  {...other}>
      {actionComponent}
    </div>
  )
}))