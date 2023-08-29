import { memo } from "react"
import styled from "styled-components"
import { floatShadow } from "../utils"
import { Button, Space } from "antd"
import { AppstoreOutlined, CompassOutlined, DeploymentUnitOutlined, SnippetsOutlined } from "@ant-design/icons"

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
  padding: 8px 0px;
  box-sizing: border-box;
`
export const LeftSide = memo(() => {
  return (
    <Container>
      <Space direction="vertical">
        <Button type="text" icon={<SnippetsOutlined />} />
        <Button type="text" icon={<AppstoreOutlined />} />
        <Button type="text" icon={<CompassOutlined />} />
        <Button type="text" icon={<DeploymentUnitOutlined />} />
      </Space>
    </Container>
  )
})