import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { LayoutOutlined, PlusOutlined, SnippetsOutlined } from "@ant-design/icons"
import { ScreenDialog } from "./ScreenDialog"
import { Spring, SvgIcon, floatShadow } from "@rxdrag/react-antd-shell"
import { NavButton } from "./NavButton"
import { ModulesDrawer } from "./ModulesDrawer"
import { Button } from "antd"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import { MenusDrawer } from "./MenusDrawer"
import { menuIcon, codeIcon } from "@rxdrag/react-shared"

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
  const [openModules, setOpenModules] = useState<boolean | undefined>(true)
  const [openNavs, setOpenNavs] = useState<boolean | undefined>(true)
  const navigate = useNavigate()
  const location = useLocation();
  const { moduleId } = useParams()
  const { menuId } = useParams()

  const modulesPath = useMemo(() => moduleId ? `${NavType.modules}/${moduleId || ""}` : `${NavType.modules}`, [moduleId])
  const modulesSelected = useMemo(() => location.pathname.indexOf("/" + modulesPath) > -1, [location.pathname, modulesPath])

  const navsPath = useMemo(() => menuId ? `${NavType.menu}/${menuId || ""}` : `${NavType.menu}`, [menuId])
  const navsSelected = useMemo(() => location.pathname.indexOf("/" + navsPath) > -1, [location.pathname, navsPath])

  const handleModulesClick = useCallback(() => {
    if (modulesSelected) {
      setOpenModules(!openModules)
    } else {
      setOpenModules(true)
    }
    setOpenNavs(false)
    navigate(modulesPath)
  }, [modulesPath, modulesSelected, navigate, openModules])

  const handleFrameClick = useCallback(() => {
    setOpenModules(false)
    setOpenNavs(false)
    navigate(NavType.frame)
  }, [navigate])

  const handleMenuClick = useCallback(() => {
    if (navsSelected) {
      setOpenNavs(!openNavs)
    } else {
      setOpenNavs(true)
    }
    setOpenModules(false)
    navigate(navsPath)
  }, [navigate, navsPath, navsSelected, openNavs])



  return (
    <Container className="rx-left-side">
      <NavButton
        title="模块"
        icon={<SnippetsOutlined />}
        //intermediate={modulesSelected && !openModules}
        selected={openModules && modulesSelected}
        onClick={handleModulesClick}
      />
      <NavButton
        title="UI框架"
        selected={location.pathname.endsWith(NavType.frame)}
        icon={<LayoutOutlined />}
        onClick={handleFrameClick}
      />
      <NavButton
        title="导航"
        icon={<SvgIcon>
          {menuIcon}
        </SvgIcon>}
        //intermediate={navsSelected && !openNavs}
        selected={openNavs && navsSelected}
        onClick={handleMenuClick}
      />
      <NavButton
        title="出码"
        icon={<SvgIcon>{codeIcon}</SvgIcon>}
      />
      <Spring />
      <ScreenDialog />
      <ModulesDrawer
        open={openModules && modulesSelected}
        onOpenChange={setOpenModules}
        title={<>
          功能
          <Spring />
          <AddButton size="small" type="text" icon={<PlusOutlined />} />
        </>}
      />
      <MenusDrawer open={openNavs && navsSelected}
        onOpenChange={setOpenNavs}
        title={<>
          导航
          <Spring />
          <AddButton size="small" type="text" icon={<PlusOutlined />} />
        </>}
      />
    </Container>
  )
})