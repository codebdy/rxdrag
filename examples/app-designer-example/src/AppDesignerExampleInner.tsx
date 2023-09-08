import { memo, useState } from "react"
import { Toolbar } from "./Toolbar"
import styled from "styled-components"
import { DeviceType } from "./interfaces"
import { UiDesigner } from "./UiDesigner"

const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-flow: column;
  box-sizing: border-box;
  background-color: ${props => props.theme.token?.colorBgContainer};
  color: ${props => props.theme.token?.colorText};
`

export const AppDesignerExampleInner = memo(() => {
  const [device, setDevice] = useState<DeviceType>(DeviceType.admin)

  return (
    <Container className="zoomable-editor">
      <Toolbar device={device} onDeviceChange={setDevice} />
      <UiDesigner device={device} />
    </Container>
  )
})