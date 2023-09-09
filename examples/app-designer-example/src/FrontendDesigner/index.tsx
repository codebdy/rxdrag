import { memo } from "react"
import styled from "styled-components"
import { LeftSide } from "./LeftSide"
import { Outlet, useParams } from "react-router-dom"
import { DeviceContext } from "../contexts"
import { DeviceType } from "../interfaces"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

export const FrontendDesigner = memo(() => {
  const { device } = useParams();
  return (
    <DeviceContext.Provider value={device as DeviceType | undefined}>
      <AppDeviceArea>
        <LeftSide />
        <Outlet />
      </AppDeviceArea>
    </DeviceContext.Provider>
  )
})