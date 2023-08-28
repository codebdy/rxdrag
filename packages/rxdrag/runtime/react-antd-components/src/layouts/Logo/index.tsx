import { forwardRef, memo } from "react"
import styled from "styled-components"

const Container = styled.div`
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 16px;
  width: 100%;
`

export const Logo = memo(forwardRef<HTMLDivElement>((props, ref) => {
  return (<Container ref={ref} className="rx-logo" style={{ color: '#efefef', fontSize: 20, fontWeight: "bold" }}>
    <img alt="Logo" width={40} height={40} style={{ marginRight: 24 }} src="/logo.png" />
    APPER
  </Container>)
}))