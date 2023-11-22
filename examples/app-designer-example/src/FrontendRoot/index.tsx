import { memo } from "react"
import { Outlet, useParams } from "react-router-dom";
import { AppFrontendContext } from "../contexts";
import { useApp } from "../hooks/useApp";
import { useQueryFrontend } from "../hooks/useQueryFrontend";
import { DeviceType } from "../interfaces";

export const FrontendRoot = memo(() => {
  const { device } = useParams();

  const app = useApp()
  const { frontend } = useQueryFrontend(app?.id, device as DeviceType | undefined)
  return (
    <AppFrontendContext.Provider value={frontend}>
      <Outlet />
    </AppFrontendContext.Provider>
  )
})