import { Badge, BadgeProps } from "antd"
import { forwardRef, memo } from "react"

export const BadgeDesigner = memo(forwardRef<HTMLDivElement>((props: BadgeProps, ref) => {
  return (
    <div ref={ref} style={{ display: "inline-block", position: "relative" }}>
      <Badge {...props} />
    </div>
  )
}))