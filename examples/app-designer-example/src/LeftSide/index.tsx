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

export const LeftSide = memo(() => {
  const [openModules, setOpenModules] = useState<boolean>()

  const handleModulesClick = useCallback(() => {
    setOpenModules(true)
  }, [])
  return (
    <Container className="rx-left-side">
      <NavButton
        title="模块"
        icon={<SnippetsOutlined />}
        intermediate
        onClick={handleModulesClick}
      />
      <NavButton title="模板" icon={<LayoutOutlined />} />
      <NavButton title="菜单" icon={<CompassOutlined />} selected />
      <NavButton title="出码" icon={<DeploymentUnitOutlined />} />
      <Spring />
      <ScreenDialog />
      <LeftDrawer open={openModules} onOpenChange={setOpenModules} />
    </Container>
  )
})