import { memo } from "react"
import styled from "styled-components"
import { LeftSide } from "./LeftSide"
import { Outlet, useParams } from "react-router-dom"
import { AppFrontendContext } from "../contexts"
import { DeviceType } from "../interfaces"
import { useApp } from "../hooks/useApp"
import { useQueryFrontend } from "../hooks/useQueryFrontend"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

export const FrontendDesigner = memo(() => {
  const { device } = useParams();
  const app = useApp()
  const { frontend } = useQueryFrontend(app?.id, device as DeviceType | undefined)
  return (
    <AppFrontendContext.Provider value={frontend}>
      <AppDeviceArea>
        <LeftSide />
        <Outlet />
      </AppDeviceArea>
    </AppFrontendContext.Provider>
  )
})