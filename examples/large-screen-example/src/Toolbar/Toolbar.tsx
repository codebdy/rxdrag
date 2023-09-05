import { GithubFilled } from "@ant-design/icons"
import { ThemeButton, floatShadow } from "@rxdrag/react-antd-shell"
import { Space, Button } from "antd"
import { Logo, MenuButton } from "example-common"
import { memo } from "react"
import styled from "styled-components"

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
  border-bottom: solid 1px ${props => props.theme.token?.colorBorderSecondary};
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
        <Logo title="大屏" />
        <ProjectTitle>大屏演示项目</ProjectTitle>
      </Space>
      <Space>
        <ThemeButton flat />
        <Button
          type="text"
          href="https://github.com/rxdrag/rxeditor"
          target="_blank"
          icon={<GithubFilled />}
        />
        <MenuButton />
      </Space>
    </ToolbarShell>
  )
})