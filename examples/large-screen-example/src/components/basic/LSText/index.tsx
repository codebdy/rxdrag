import { forwardRef, memo } from "react"
import { withFreedom } from "../../common";
import styled from "styled-components";

const Container = styled.div`
  background-color: transparent;
`

const PlaceHolder = styled.div`
  height: 20px;
  width: 50px;
  color: ${props => props.theme.token?.colorTextSecondary};
  white-space: nowrap;
`

export type LSTextProps = {
  value?: string
}

export const LSText = memo(withFreedom<LSTextProps>(forwardRef<HTMLDivElement, LSTextProps>((props, ref) => {
  const { value, ...rest } = props;
  return (
    <Container ref={ref} {...rest}>
      {value || <PlaceHolder>Please Input</PlaceHolder>}
    </Container>
  )
})))