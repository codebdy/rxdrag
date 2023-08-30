import { memo } from "react"
import { EditorScope, ThemeButton, ZoomableEditor } from "@rxdrag/react-antd-shell"
import { ApiOutlined, CodeSandboxOutlined, GithubFilled, NodeIndexOutlined, SettingOutlined } from "@ant-design/icons"
import { Space, Button, Select } from "antd"
import { Logo, MenuButton, setterLocales } from "example-common"
import styled from "styled-components"
import { SaveButton } from "./SaveButton"

const ProjectTitle = styled.span`
  margin-left: 16px;
  color: ${porps => porps.theme.token?.colorTextSecondary};
  font-size: 14px;
`

export const LargeScreenExample = memo(() => {
  return (
    <EditorScope
      locales={setterLocales}
    >
      <ZoomableEditor
        topBar={
          <>
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
          </>
        }
      />
    </EditorScope>
  )
})