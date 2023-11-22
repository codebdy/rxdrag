import React, { CSSProperties, forwardRef, memo } from "react"
import styled from "styled-components"
import { withContainerLayout } from "../../hocs"

const PageContainer = styled.div`
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
`

export type PageProps = {
  children?: React.ReactNode,
  style?: CSSProperties,
  className?: string
}

export const PageImp = memo(forwardRef<HTMLDivElement, PageProps>((props, ref) => {
  const { children, ...rest } = props;
  return (<PageContainer ref={ref} {...rest}>
    {
      children
    }
  </PageContainer>)
}))

export const Page = withContainerLayout(PageImp)
