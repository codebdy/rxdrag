import { memo } from "react"
import styled from "styled-components"
import { LeftSide } from "./LeftSide"
import { Outlet } from "react-router-dom"
import { useQueryAppMeta } from "../hooks/useQueryAppMeta"
import { MetaContext } from "./contexts"
import { Spin } from "antd"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

export const FrontendDesigner = memo(() => {
  const { meta, loading } = useQueryAppMeta("app1")
  return (
    loading
      ? <Spin spinning={loading}>
      </Spin>
      : <MetaContext.Provider value={meta?.publishedContent}>
        <AppDeviceArea>
          <LeftSide />
          <Outlet />
        </AppDeviceArea>
      </MetaContext.Provider>
  )
})