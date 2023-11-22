import { forwardRef, memo } from "react"
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
`

export const TreeListItemActions = memo(forwardRef<HTMLDivElement>((
  props: { children?: React.ReactNode }, ref) => {
  const { children, ...other } = props;
  return (
    <Container
      ref={ref}
      {...other}
    >
      {children}
    </Container>
  )
}))