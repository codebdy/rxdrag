import React, { forwardRef, memo } from "react"
import styled from "styled-components"

const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

export type DialogFooterProps = {
  className?: string,
  children?: React.ReactNode,
}

export const DialogFooter = memo(forwardRef<HTMLDivElement>((props: DialogFooterProps, ref) => {
  const { children, ...other } = props;
  return <Footer className="rx-dialog-footer" ref={ref} {...other}>
    {children}
  </Footer>
}))