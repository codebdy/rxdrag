import { ApiOutlined, NodeIndexOutlined, SettingOutlined, GithubFilled, AppstoreOutlined, DesktopOutlined } from "@ant-design/icons"
import { floatShadow } from "@rxdrag/react-antd-shell"
import { Space, Button, MenuProps, Menu } from "antd"
import { Logo, MenuButton } from "example-common"
import { memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { SvgIcon } from "@rxdrag/react-antd-shell"
import { DeviceType, ThemeMode } from "../interfaces"
import { useApp } from "../hooks/useApp"
import { useAppTranslate } from "../hooks/useAppTranslate"
import { ThemeButton } from "../components"
import { useNavigate, useParams } from "react-router-dom"
import { extendsIcon, h5Icon, largeScreenIcon, modelIcon, pluginIcon, websiteIcon } from "@rxdrag/react-shared"

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

const TopMenu = styled(Menu)`
  background-color: transparent;
  border-bottom: 0;
`

const ProjectTitle = styled.span`
  margin-left: 16px;
  color: ${porps => porps.theme.token?.colorTextSecondary};
  font-size: 14px;
`

export enum TopNavType {
  ui = "ui-designer",
  model = "model",
  extends = "extends",
  api = "api",
  workflow = "workflow",
  plugins = "plugins",
  setttings = "settings"
}


export const Toolbar = memo((
  props: {
    themeMode?: ThemeMode,
    onThemeModeChange?: (themeMode: ThemeMode) => void,
  }
) => {
  const { themeMode, onThemeModeChange } = props;
  const [current, setCurrent] = useState<string>();
  const params = useParams()

  const onClick: MenuProps['onClick'] = useCallback((e: { key: string }) => {
    setCurrent(e.key);
  }, []);

  const app = useApp()
  const t = useAppTranslate()
  const { device } = useParams();
  const navigate = useNavigate()
  const handleDeviceChange = useCallback((value: string) => {
    navigate("ui-designer/" + value)
  }, [navigate])

  const items: MenuProps['items'] = useMemo(() => [
    {
      label: '界面',
      key: TopNavType.ui,
      icon: <AppstoreOutlined />,
      children: [
        {
          label: t(DeviceType.admin),
          key: DeviceType.admin,
          icon: <DesktopOutlined />,
          onClick: () => handleDeviceChange(DeviceType.admin),
        },
        {
          label: t(DeviceType.h5),
          key: DeviceType.h5,
          icon: <SvgIcon>{h5Icon}</SvgIcon>,
          onClick: () => handleDeviceChange(DeviceType.h5),
        },
        {
          label: t(DeviceType.website),
          key: DeviceType.website,
          icon: <SvgIcon>{websiteIcon}</SvgIcon>,
          onClick: () => handleDeviceChange(DeviceType.website),
        },
        {
          label: t(DeviceType.largeScreen),
          key: DeviceType.largeScreen,
          icon: <SvgIcon>{largeScreenIcon}</SvgIcon>,
          onClick: () => handleDeviceChange(DeviceType.largeScreen),
        },
      ],
    },
    {
      label: '模型',
      key: TopNavType.model,
      icon: <SvgIcon>
        {modelIcon}
      </SvgIcon>,
      onClick: () => navigate(TopNavType.model)
    },
    {
      label: '服务扩展',
      key: TopNavType.extends,
      icon: <SvgIcon>
        {extendsIcon}
      </SvgIcon>
      ,
      onClick: () => navigate(TopNavType.extends)
    },
    {
      label: '接口',
      key: TopNavType.api,
      icon: <ApiOutlined />,
      onClick: () => navigate(TopNavType.api)
    },
    {
      label: '工作流',
      key: TopNavType.workflow,
      icon: <NodeIndexOutlined />,
      onClick: () => navigate(TopNavType.workflow)
    },
    {
      label: '插件',
      key: TopNavType.plugins,
      icon: <SvgIcon>
        {pluginIcon}
      </SvgIcon>,
      onClick: () => navigate(TopNavType.plugins)
    },
    {
      label: '设置',
      key: TopNavType.setttings,
      icon: <SettingOutlined />,
      onClick: () => navigate(TopNavType.setttings)
    },
  ], [handleDeviceChange, navigate, t]);


  return (
    <ToolbarShell className="zoomable-toobar">
      <Space>
        <Logo mini />
        <TopMenu
          onClick={onClick}
          selectedKeys={[device || current || params?.["*"] || ""]}
          mode="horizontal"
          items={items}
        />
        <ProjectTitle>{app?.title}</ProjectTitle>
      </Space>
      <Space>
        <ThemeButton flat themeMode={themeMode} onThemeModeChange={onThemeModeChange} />
        <Button
          type="text"
          href="https://github.com/rxdrag/rxeditor"
          target="_blank"
          icon={<GithubFilled />}
        />
        {/* <Button type="primary">保存</Button> */}
        <Button>预览</Button>
        <Button >发布</Button>
        <MenuButton />
      </Space>
    </ToolbarShell>
  )
})