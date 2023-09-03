import { CSSProperties, forwardRef, memo } from "react"
import styled from "styled-components"
import classNames from "classnames"

const Container = styled.div`
  //这行一定要加，其它自由布局容器要参照
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100%;
  min-width: 100%;
  background-color: ${props => props.theme?.token?.colorBgBase};
  color: ${props => props.theme?.token?.colorText};
  background-size: 100% 100%;
`

export type RootBoardInnerProps = {
  backgroundImage?: string,
  className?: string,
  children?: React.ReactNode,
  style?: CSSProperties,
}

export const RootBoardInner = memo(forwardRef<HTMLDivElement, RootBoardInnerProps>((props, ref) => {
  const { backgroundImage, style, className, children, ...rest } = props
  return (
    <Container
      ref={ref}
      className={classNames("main-board", className)}
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