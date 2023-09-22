import { memo } from "react"
import styled from "styled-components"
import { LeftSide } from "./LeftSide"
import { Outlet } from "react-router-dom"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

export const FrontendDesigner = memo(() => {

  return (
    <AppDeviceArea>
      <LeftSide />
      <Outlet />
    </AppDeviceArea>
  )
})