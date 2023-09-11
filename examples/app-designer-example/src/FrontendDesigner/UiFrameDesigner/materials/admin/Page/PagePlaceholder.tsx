import { forwardRef, memo } from "react"
import { Page } from "../../../../components/admin"
import styled from "styled-components"

const StylePage = styled(Page)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 30px;
  color: ${props => props.theme.token?.colorTextDisabled};
  background-color: ${props => props.theme.token?.colorBorderSecondary};
`

export const PagePlaceholder = memo(forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <StylePage ref={ref} {...props}>
      页面内容区
    </StylePage>
  )
}))