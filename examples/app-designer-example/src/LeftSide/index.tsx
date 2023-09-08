import { memo } from "react"
import styled from "styled-components"
import { CompassOutlined, DeploymentUnitOutlined, LayoutOutlined, SnippetsOutlined } from "@ant-design/icons"
import { ScreenDialog } from "./ScreenDialog"
import { Spring, floatShadow } from "@rxdrag/react-antd-shell"
import { NavButton } from "./NavButton"

const Container = styled.div`
  width: 48px;
  top: 56px;
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
  return (
    <Container className="rx-left-side">
      <NavButton title="模块" icon={<SnippetsOutlined />} intermediate />
      <NavButton title="模板" icon={<LayoutOutlined />} />
      <NavButton title="菜单" icon={<CompassOutlined />} selected />
      <NavButton title="出码" icon={<DeploymentUnitOutlined />} />
      <Spring />
      <ScreenDialog />
    </Container>
  )
})