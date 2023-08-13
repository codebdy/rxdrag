import { memo } from "react"
import styled from "styled-components"
import { NavPostion, Navbar } from "../Navbar"
import { Toolbar } from "../Toolbar"
import { Toolbox } from "../Toolbox"
import { PropertyPanel } from "../PropertyPanel"

const Container = styled.div`
  z-index: 100000;
`

export const Toolkits = memo(() => {

  return (
    <Container>
      <Toolbox />
      <PropertyPanel />
      <Toolbar />
      <Navbar position={NavPostion.BottomRight} />
    </Container>
  )
})