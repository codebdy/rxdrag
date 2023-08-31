import { CodeSandboxOutlined, ApiOutlined, NodeIndexOutlined, SettingOutlined, GithubFilled } from "@ant-design/icons"
import { ThemeButton, floatShadow } from "@rxdrag/react-antd-shell"
import { Space, Button, Select } from "antd"
import { Logo, MenuButton } from "example-common"
import { memo } from "react"
import styled from "styled-components"
import { SaveButton } from "../SaveButton"
import { SvgIcon } from "@rxdrag/react-antd-shell"

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
          <Button type="text"
            icon={
              <SvgIcon>
                <svg fill="currentColor" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em"><path d="M915.2 1015.04H108.8a97.28 97.28 0 0 1-97.28-96.64V111.36A97.28 97.28 0 0 1 108.8 14.72h806.4a97.28 97.28 0 0 1 97.28 96.64v807.04a97.28 97.28 0 0 1-97.28 96.64zM108.8 80.64a30.72 30.72 0 0 0-30.72 30.72v807.04a30.72 30.72 0 0 0 30.72 30.72h806.4a30.72 30.72 0 0 0 30.72-30.72V111.36a30.72 30.72 0 0 0-30.72-30.72z" ></path><path d="M323.84 817.28a32.64 32.64 0 0 1-32.64-33.28V245.76a33.28 33.28 0 1 1 64 0v538.24a33.28 33.28 0 0 1-31.36 33.28z" ></path><path d="M323.84 638.08m-96.64 0a96.64 96.64 0 1 0 193.28 0 96.64 96.64 0 1 0-193.28 0Z" ></path><path d="M700.16 817.28a33.28 33.28 0 0 1-33.28-33.28V245.76a33.28 33.28 0 1 1 64 0v538.24a32.64 32.64 0 0 1-30.72 33.28z" ></path><path d="M700.16 391.68m-96.64 0a96.64 96.64 0 1 0 193.28 0 96.64 96.64 0 1 0-193.28 0Z" ></path></svg>
              </SvgIcon>
            }
          >插件</Button>
          <Button type="text" icon={<SettingOutlined />}>设置</Button>
          <Select value="大屏"  />
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