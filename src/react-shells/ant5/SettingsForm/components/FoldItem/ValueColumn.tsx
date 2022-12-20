import { Col, Tooltip } from "antd"
import React, { CSSProperties, memo } from "react"
import cls from "classnames"

export const ValueIcon = memo((props: { children?: React.ReactNode }) => {
  return (
    <div style={{ marginRight: 8, display: "flex", alignItems: "center", height: "100%" }}>
      {props.children}
    </div>
  )
})

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
        <Tooltip title={title}>
          <ValueIcon>
            {icon}
          </ValueIcon>
        </Tooltip>
      }

      {children}
    </Col>
  )
})