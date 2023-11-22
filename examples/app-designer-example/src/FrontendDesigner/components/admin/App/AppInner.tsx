import { CSSProperties, forwardRef, memo } from "react"
import styled from "styled-components"
import classNames from "classnames"

const Container = styled.div`
  min-height: 100%;
  min-width: 100%;
  box-sizing: border-box;
  display: flex;
  flex-flow: column;
  background-color: ${props => props.theme?.token?.colorBgBase};
  color: ${props => props.theme?.token?.colorText};
  background-size: 100% 100%;
`

export type AppInnerProps = {
  backgroundImage?: string,
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
}

export const AppInner = memo(forwardRef<HTMLDivElement, AppInnerProps>((props, ref) => {
  const { backgroundImage, style, className, children, ...rest } = props
  return (
    <Container
      ref={ref}
      className={classNames("app", className)}
      style={{
        backgroundImage: `url(${backgroundImage})`,
        ...style
      }}
      {...rest}
    >
      {children}
    </Container >
  )
}))