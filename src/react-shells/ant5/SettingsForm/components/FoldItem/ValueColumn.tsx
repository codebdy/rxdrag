import { Col, Tooltip } from "antd"
import React, { CSSProperties, forwardRef, memo } from "react"
import cls from "classnames"

export type ValueIconProps = {
  children?: React.ReactNode
}
export const ValueIcon = memo(forwardRef<HTMLDivElement, ValueIconProps>((props, ref) => {
  return (
    <div ref={ref} className="rx-value-icon">
      {props.children}
    </div>
  )
}))

export const ValueColumn = memo((props: {
  title?: string,
  icon?: React.ReactNode,
  span?: number,
  onFirstLine?: boolean,
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode
}) => {
  const { title, icon, span = 12, onFirstLine = true, className, children, style, ...other } = props

  return (
    <Col
      span={span}
      className={cls("value-column", className)}
      style={{ marginTop: !onFirstLine ? 8 : undefined, ...style }}
      {...other}
    >
      {
        icon &&
        <Tooltip title={title}>
          <span>
            <ValueIcon>
              {icon}
            </ValueIcon>
          </span>
        </Tooltip>
      }

      {children}
    </Col>
  )
})