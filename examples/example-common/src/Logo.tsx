import { CSSProperties, memo } from "react"
import styled from "styled-components"
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  color: ${props => props.theme?.token?.colorText};
  img{
    height: 32px;
    width: 32px;
    margin-right: 8px;
  }
`

export const Logo = memo((
  props: {
    className?: string,
    style?: CSSProperties,
    title?: string,
    mini?: boolean,
  }
) => {
  const { title, mini, ...other } = props
  return (
    <LogoContainer {...other}>
      <img alt="rxeditor" height={32} width={32} src="/logo.png" />
      {!mini && `rx.${title || "___"}`}
    </LogoContainer>
  )
})