import { forwardRef, memo } from "react"
import styled from "styled-components"
import { withContainerLayout } from "../../hocs"

const StyledContainer = styled.div`
  min-height: 100%;
  height: 100%;
`

export type ContainerProps = {
  children?: React.ReactNode,
}

const ContainerInner = memo(forwardRef<HTMLDivElement, ContainerProps>((
  props, ref
) => {
  const { children, ...rest } = props;
  return (
    <StyledContainer ref={ref} {...rest}>
      {children}
    </StyledContainer>
  )
}))

export const Container = withContainerLayout(ContainerInner, { p: { pl: 2, pr: 2, pt: 2, pb: 2 } })
