import { ZoomableEditor } from "@rxdrag/react-antd-shell"
import { memo, useMemo } from "react"
import { useParams } from "react-router-dom"
import { useQueryModule } from "../../hooks/useQueryModule"
import { useAppFrontend } from "../../hooks/useAppFrontend"
import { uiToolboxes } from "./config"
import { TabsProps } from "antd"
import styled from "styled-components"
import { FlowDesigner } from "../BottomConsole/FlowDesigner"
import { ScriptDesigner } from "../BottomConsole/ScriptDesigner"
import { ModuleContext } from "../contexts"

const Label = styled.div`
  display: flex;
  align-items: center;
  color: ${props => props.theme.token.colorTextSecondary};
  justify-content: flex-start;
  .anticon{
    margin-right: 4px !important;
  }
`

export const ModuleUiDesignerInner = memo(() => {
  const { moduleId } = useParams()
  const device = useAppFrontend()?.deviceType
  const { module } = useQueryModule(device, moduleId || "")
  const Toolbox = uiToolboxes[device || ""]


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

  return (
    <ModuleContext.Provider value={module}>
      {
        module
          ? <ZoomableEditor
            toolbox={
              Toolbox && <Toolbox />
            }
            schemas={module?.views}
            bottomConsole={{
              items
            }}
          />
          : <></>
      }
    </ModuleContext.Provider>
  )
})