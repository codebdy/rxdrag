import { Col } from "antd"
import React, { memo } from "react"
import styled from "styled-components"

const Shell = styled((props) => <Col span={12} {...props} />)`
  display: flex;
  flex-flow: column;
  align-items: center;
`

const Icon = styled.div`
  font-size: 32px;
`

const Title = styled.div`
  font-size: 12px;
  color: ${props=>props.theme.token?.colorTextSecondary}
  
`

export const ToolItem = memo((
  props: {
    title?: string,
    icon?: React.ReactNode,
  }
) => {
  const { title, icon } = props
  return (
    <Shell>
      <Icon>{icon}</Icon>
      <Title>{title}</Title>
    </Shell>
  )
})