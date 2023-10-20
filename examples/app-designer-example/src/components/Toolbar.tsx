import { memo } from "react"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-flow: row;
  align-items: center;
  justify-content: space-between;
  height: 48px;
  background-color: ${props => props.theme?.token?.colorBgBase};
  border: solid 1px ${props => props.theme?.token?.colorBorderSecondary};
  border-right: 0;
  border-left: 0;
  padding: 0 8px;
`

export const Toolbar = memo((
  props: {
    children?: React.ReactNode
  }
) => {
  const { children } = props;
  return (
    <Container className="editor-toolbar">
      {children}
    </Container>
  )
})