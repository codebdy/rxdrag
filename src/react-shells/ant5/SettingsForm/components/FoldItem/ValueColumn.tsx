import { Col } from "antd"
import React, { CSSProperties, memo } from "react"
import cls from "classnames"

export const ValueColumn = memo((props: {
  span?: number,
  onFirstLine?: boolean,
  className?: string,
  style?: CSSProperties,
  children?: React.ReactNode
}) => {
  const { span = 12, onFirstLine = true, className, children, style, ...other } = props
  return (
    <Col
      span={span}
      className={cls("value-column", className)}
      style={{ marginTop: !onFirstLine ? 8 : undefined, ...style }}
      {...other}
    >
      {children}
    </Col>
  )
})