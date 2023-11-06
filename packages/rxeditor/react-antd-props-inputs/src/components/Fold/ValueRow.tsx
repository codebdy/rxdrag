import { Row } from "antd"
import React, { memo } from "react"

export const ValueRow = memo((
  props: {
    gutter?: number
    children?: React.ReactNode
  }
) => {
  const { gutter = 8, children } = props
  return (
    <Row gutter={gutter}>
      {children}
    </Row>
  )
})