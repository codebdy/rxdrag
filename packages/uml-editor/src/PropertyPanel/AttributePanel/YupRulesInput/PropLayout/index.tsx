import { Form } from "antd"
import { memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  display: flex;
`

const Expression = styled.div`
  padding-left: 4px;
`

export const PropLayout = memo((
  props: {
    label?: string,
    children?: React.ReactNode,
    expressionSetter?: React.ReactElement,
  }
) => {
  const { label, children, expressionSetter } = props

  return (
    <Container className="prop-layout">
      {
        label
          ? <Form.Item label={label} className="prop-form-item" style={{ flex: 1 }}>
            {children}
          </Form.Item>
          : children
      }
      <Expression className="prop-expression">
        {expressionSetter}
      </Expression>
    </Container>
  )
})