import { CodeSandboxOutlined, ApiOutlined, NodeIndexOutlined, SettingOutlined, GithubFilled } from "@ant-design/icons"
import { ThemeButton, floatShadow } from "@rxdrag/react-antd-shell"
import { Space, Button, Select } from "antd"
import { Logo, MenuButton } from "example-common"
import { memo } from "react"
import styled from "styled-components"
import { SaveButton } from "../SaveButton"

const ToolbarShell = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 8px 16px;
  box-shadow: ${floatShadow};
  z-index: 1;
  background-color: ${props => props.theme.token?.colorBgBase};
`

const ProjectTitle = styled.span`
  margin-left: 16px;
  color: ${porps => porps.theme.token?.colorTextSecondary};
  font-size: 14px;
`

export const Toolbar = memo(() => {
  return (
    <ToolbarShell className="zoomable-toobar">
      <Space>
        <Logo title="大屏" mini />
        <Space>
          <Button type="text" icon={<CodeSandboxOutlined />}>模型</Button>
          <Button type="text" icon={<ApiOutlined />}>接口</Button>
          <Button type="text" icon={<NodeIndexOutlined />}>工作流</Button>
          <Button type="text" icon={<SettingOutlined />}>设置</Button>
          <Select value="大屏" open={false} />
        </Space>
        <ProjectTitle>火星监测项目</ProjectTitle>
      </Space>
      <Space>
        <ThemeButton flat />
        <Button
          type="text"
          href="https://github.com/rxdrag/rxeditor"
          target="_blank"
          icon={<GithubFilled />}
        />
        <SaveButton />
        <MenuButton />
      </Space>
    </ToolbarShell>
  )
})