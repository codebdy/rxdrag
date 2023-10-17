import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { memo, useCallback, useMemo, useState } from "react"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { uiToolboxes } from "./config"
import { Button, Space, TabsProps, Tooltip } from "antd"
import styled from "styled-components"
import { FlowDesigner } from "../BottomConsole/FlowDesigner"
import { ScriptDesigner } from "../BottomConsole/ScriptDesigner"
import { ModuleContext } from "../contexts"
import { IModule } from "../../interfaces/module"
import { LayoutOutlined } from "@ant-design/icons"
import { ViewManager } from "./ViewManager"

const Label = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.token.colorTextSecondary};
  justify-content: flex-start;
  .anticon{
    margin-right: 4px !important;
  }
`

export const ModuleUiDesignerInner = memo((
  props: {
    module?: IModule
  }
) => {
  const { module } = props
  const device = useAppFrontend()?.deviceType
  const Toolbox = uiToolboxes[device || ""]
  const [showFrame, setShowFrame] = useState<boolean>(true)

  const handleShowFrameClick = useCallback(() => {
    setShowFrame(show => !show)
  }, [setShowFrame])

  const items: TabsProps['items'] = useMemo(() => {
    return [
      {
        label: <Label >
          行为流
        </Label>,
        key: "logicflow",
        children: <FlowDesigner />
      },
      {
        label: <Label >
          脚本
        </Label>,
        key: "script",
        children: <ScriptDesigner />
      },
      //把快捷控制器附加到物料上，放在属性面板配置
      // {
      //   label: <Label>快捷</Label>,
      //   key: "shortcurt",
      //   children: "快捷控制器"
      // },
    ]
  }, [])

  const params = useMemo(() => ({ showFrame }), [showFrame])

  return (
    <ModuleContext.Provider value={module}>
      {
        module
          ? <ZoomableEditor
            toolbox={
              Toolbox && <Toolbox />
            }
            schemas={module?.views}
            iFrameParams={params}
            bottomConsole={{
              items,
              addon: <Space style={{ marginLeft: 8 }}>
                <Tooltip title={"UI框架"} placement="topRight">
                  <div>
                    <Button
                      type={showFrame ? "link" : "text"}
                      size="small"
                      icon={<LayoutOutlined />}
                      onClick={handleShowFrameClick}
                    />
                  </div>
                </Tooltip>
                <ViewManager />
              </Space>
            }}
          />
          : <></>
      }
    </ModuleContext.Provider>
  )
})