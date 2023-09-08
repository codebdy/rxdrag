import { memo, useCallback, useState } from "react"
import styled from "styled-components"
import { CompassOutlined, DeploymentUnitOutlined, LayoutOutlined, SnippetsOutlined } from "@ant-design/icons"
import { ScreenDialog } from "./ScreenDialog"
import { Spring, floatShadow } from "@rxdrag/react-antd-shell"
import { NavButton } from "./NavButton"
import { LeftDrawer } from "./LeftDrawer"

const Container = styled.div`
  position: relative;
  width: 48px;
  padding: 0;
  padding-bottom: 8px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 0;
  background-color: ${props => props.theme.token?.colorBgBase};
  color: ${props => props.theme.token?.colorText};
  box-shadow: ${floatShadow};
  height: 100%;
  box-sizing: border-box;
  z-index: 1;
`

const enum NavType {
  moudules = "modules",
  frame = "frame",
  menu = "menu",
  code = "code"
}

export const LeftSide = memo(() => {
  const [openModules, setOpenModules] = useState<boolean>()
  const [navKey, setNavKey] = useState<NavType>()


  const handleModulesClick = useCallback(() => {
    setOpenModules(true)
    setNavKey(NavType.moudules)
  }, [])

  const handleFrameClick = useCallback(() => {
    setOpenModules(false)
    setNavKey(NavType.frame)
  }, [])


  const handleMenuClick = useCallback(() => {
    setOpenModules(false)
    setNavKey(NavType.menu)
  }, [])
  return (
    <Container className="rx-left-side">
      <NavButton
        title="模块"
        icon={<SnippetsOutlined />}
        intermediate={navKey === NavType.moudules && !openModules}
        selected={openModules}
        onClick={handleModulesClick}
      />
      <NavButton
        title="UI框架"
        selected={navKey === NavType.frame}
        icon={<LayoutOutlined />}
        onClick={handleFrameClick}
      />
      <NavButton
        title="菜单"
        icon={<CompassOutlined />}
        selected={navKey === NavType.menu}
        onClick={handleMenuClick}
      />
      <NavButton
        title="出码"
        icon={<DeploymentUnitOutlined />}
      />
      <Spring />
      <ScreenDialog />
      <LeftDrawer open={openModules} onOpenChange={setOpenModules} />
    </Container>
  )
})