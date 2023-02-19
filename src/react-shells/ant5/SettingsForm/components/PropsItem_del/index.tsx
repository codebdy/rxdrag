import { Form } from "antd";
import { memo } from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`

const InputArea = styled.div`
  flex: 1;
`
const ExpressionArea = styled.div`
  margin-left: 2px;
`

export const PropsItem = memo((
  props: {
    children?: React.ReactNode,
    expression?: React.ReactNode,
  }
) => {
  const { children, expression, ...other } = props

  return (
    <Form.Item
      {...other}
    >
      <Container>
        <InputArea>
          {
            children
          }
        </InputArea>
        {
          expression &&
          <ExpressionArea>
            {expression}
          </ExpressionArea>
        }
      </Container>
    </Form.Item>
  )
})