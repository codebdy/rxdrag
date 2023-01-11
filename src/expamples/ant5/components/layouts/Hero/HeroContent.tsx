import { useToken } from "antd/es/theme/internal"
import { CSSProperties, forwardRef, memo } from "react"
import styled from "styled-components"

const HeroInner = styled.div.attrs((props: { color?: string }) => {
  return {
    color: props.color
  }
})`
  padding: 24px;
  border-radius: 8px;
  color: ${props => props.color}
`
export type HeroContentProps = {
  style?: CSSProperties,
  children?: React.ReactNode,
}

export const HeroConent = memo(forwardRef<HTMLDivElement, HeroContentProps>((props, ref) => {
  const [, token] = useToken()
  return (
    <HeroInner
      ref={ref}
      color={token.colorText}
      {...props}
    />
  )
}))