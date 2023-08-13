import { memo } from "react"
import styled from "styled-components"
import { NavPostion, Navbar } from "../Navbar"
import { Toolbar } from "../Toolbar"

const Container = styled.div`
  z-index: 100000;
`

export const Toolkits = memo(() => {

  return (
    <Container>
      <Toolbar />
      <Navbar position={NavPostion.BottomRight} />
    </Container>
  )
})