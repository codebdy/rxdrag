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
    setter?: React.ReactElement,
    expressionSetter?: React.ReactElement,
  }
) => {
  const { label, setter, expressionSetter } = props

  return (
    <Container className="prop-layout">
      <Form.Item label={label} className="prop-form-item" style={{ flex: 1 }}>
        {setter}
      </Form.Item>
      <Expression className="prop-expression">
        {expressionSetter}
      </Expression>
    </Container>
  )
})