import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { LayoutOutlined, PlusOutlined, SnippetsOutlined } from "@ant-design/icons"
import { ScreenDialog } from "./ScreenDialog"
import { Spring, SvgIcon, floatShadow } from "@rxdrag/react-antd-shell"
import { NavButton } from "./NavButton"
import { LeftDrawer } from "./LeftDrawer"
import { Button } from "antd"
import { codeIcon, menuIcon } from "./icons"
import { useLocation, useNavigate, useParams } from "react-router-dom"

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
  z-index: 10;
`

const AddButton = styled(Button)`
  margin-right: 8px;
`

export const enum NavType {
  modules = "modules",
  frame = "frame",
  menu = "menu",
  code = "code"
}

export const LeftSide = memo(() => {
  const [openModules, setOpenModules] = useState<boolean>()
  const navigate = useNavigate()
  const location = useLocation();
  const { moduleId } = useParams()

  const modulesPath = useMemo(() => moduleId ? `/${NavType.modules}/${moduleId || ""}` : `/${NavType.modules}`, [moduleId])
  const handleModulesClick = useCallback(() => {
    setOpenModules(!openModules)
    navigate(modulesPath)
  }, [modulesPath, navigate, openModules])

  const handleFrameClick = useCallback(() => {
    setOpenModules(false)
    navigate(NavType.frame)
  }, [navigate])

  const handleMenuClick = useCallback(() => {
    setOpenModules(false)
    navigate(NavType.menu)
  }, [navigate])
  return (
    <Container className="rx-left-side">
      <NavButton
        title="模块"
        icon={<SnippetsOutlined />}
        intermediate={!!location.pathname.indexOf(modulesPath) && !openModules}
        selected={openModules}
        onClick={handleModulesClick}
      />
      <NavButton
        title="UI框架"
        selected={location.pathname.endsWith(NavType.frame)}
        icon={<LayoutOutlined />}
        onClick={handleFrameClick}
      />
      <NavButton
        title="菜单"
        icon={<SvgIcon>
          {menuIcon}
        </SvgIcon>}
        selected={location.pathname.endsWith(NavType.menu)}
        onClick={handleMenuClick}
      />
      <NavButton
        title="出码"
        icon={<SvgIcon>{codeIcon}</SvgIcon>}
      />
      <Spring />
      <ScreenDialog />
      <LeftDrawer
        open={openModules}
        onOpenChange={setOpenModules}
        title={<>
          功能
          <Spring />
          <AddButton size="small" type="text" icon={<PlusOutlined />} />
        </>}
      />
    </Container>
  )
})