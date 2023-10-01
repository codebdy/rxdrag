import { forwardRef, memo } from "react";
import styled from "styled-components";

const TitleContainer = styled.div`
    flex: 1;
`

export type DrawerTitleProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DrawerTitle = memo(forwardRef<HTMLDivElement>((props: DrawerTitleProps, ref) => {
  const { children, ...other } = props;
  return <TitleContainer className="drawer-title" ref={ref} {...other}>
    {children}
  </TitleContainer>
}))