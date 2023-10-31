import { Page } from "@rxdrag/react-antd-components"
import { forwardRef, memo } from "react"
import styled from "styled-components"

const StylePage = styled(Page)`
  min-height: 100%;
  display: flex;
  flex-flow: column;
  align-items: stretch;
  justify-content: stretch;
  font-size: 30px;
  color: ${props => props.theme.token?.colorTextDisabled};
  //padding: 16px;
  box-sizing: border-box;
  font-style: italic;
`

const PageInner = styled.div`
  height: 100%;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  border: dashed 2px ${props => props.theme.token?.colorBorder};
  box-sizing: border-box;
`

export const PagePlaceholder = memo(forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <StylePage ref={ref} {...props}>
      <PageInner>
        页面内容区
      </PageInner>
    </StylePage>
  )
}))