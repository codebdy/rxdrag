import { memo } from "react"
import styled from "styled-components"
import { NavPostion, NavToolbar } from "../NavToolbar"

const Container = styled.div`
  z-index: 100000;
`

export const Toolkits = memo(() => {

  return (
    <Container>
      <NavToolbar position={NavPostion.BottomRight} />
    </Container>
  )
})