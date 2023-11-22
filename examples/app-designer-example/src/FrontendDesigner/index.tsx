import { memo } from "react"
import styled from "styled-components"
import { LeftSide } from "./LeftSide"
import { Outlet } from "react-router-dom"
import { useQueryAppMeta } from "../hooks/useQueryAppMeta"
import { EntitiesContext, MetaContext } from "./contexts"
import { Spin } from "antd"
import { useBuildEntities } from "./hooks/useBuildEntities"

//设备端的编辑区
const AppDeviceArea = styled.div`
    flex:1;
    display: flex;
    height: 0;
  `

export const FrontendDesigner = memo(() => {
  const { meta, loading } = useQueryAppMeta("app1")

  const entities = useBuildEntities(meta?.publishedContent)

  return (
    loading
      ? <Spin spinning={loading}>
      </Spin>
      : <MetaContext.Provider value={meta?.publishedContent}>
        <EntitiesContext.Provider value={entities}>
          <AppDeviceArea>
            <LeftSide />
            <Outlet />
          </AppDeviceArea>
        </EntitiesContext.Provider>
      </MetaContext.Provider>
  )
})