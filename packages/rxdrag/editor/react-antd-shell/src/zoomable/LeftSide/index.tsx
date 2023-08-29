import { memo } from "react"
import styled from "styled-components"
import { floatShadow } from "../utils"
import { Button } from "antd"
import { AppstoreOutlined, CompassOutlined, DeploymentUnitOutlined, HistoryOutlined, SettingOutlined, SnippetsOutlined } from "@ant-design/icons"

const Container = styled.div`
  width: 40px;
  max-height: calc(100% - 100px);
  position: fixed;
  top: 64px;
  left: 16px;
  display: flex;
  flex-flow: column;
  align-items: center;
  border-radius: 8px;
  background-color: ${props => props.theme.token?.colorBgBase};
  color: ${props => props.theme.token?.colorText};
  box-shadow: ${floatShadow};
  padding: 0px;
  box-sizing: border-box;
`

const ButtonMask = styled.div`
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  flex-flow: column;
  width: 100%;
`

export const LeftNavButton = styled(Button).attrs({ block: true, })`
  border-radius: 0;
  height: 40px;
`

export const LeftSide = memo(() => {
  return (
    <Container>
      <ButtonMask>
        <LeftNavButton icon={<SnippetsOutlined />} type="primary" />
        <LeftNavButton icon={<AppstoreOutlined />} type="text" />
        <LeftNavButton icon={<HistoryOutlined />} type="text" />
        <LeftNavButton icon={<CompassOutlined />} type="text" />
        <LeftNavButton icon={<DeploymentUnitOutlined />} type="text" />
        <LeftNavButton icon={<SettingOutlined />} type="text" />
      </ButtonMask>
    </Container>
  )
})