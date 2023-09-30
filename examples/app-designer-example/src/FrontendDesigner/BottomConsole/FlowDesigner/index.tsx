import { ReactNode, memo, useCallback, useMemo, useState } from "react"
import styled from "styled-components"
import { Button, Tooltip, theme } from "antd"
import { FunctionOutlined, ControlOutlined, CloseOutlined, PartitionOutlined, NodeIndexOutlined } from "@ant-design/icons"
import { FXes } from "./FXes"
import { Flows } from "./Flows"
import { LeftNav } from "../common/LeftNav"
import { LeftColumn } from "../common/LeftColumn"
import { Container } from "../common/Container"
import { PanelTitle } from "../common/PanelTitle"
import { LogicFlowEditorAntd5Scope, Toolbox } from "@rxdrag/logicflow-editor-antd5"
import { activityMaterialCategories, activityMaterialLocales } from "../minion-materials"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { useDesignerEngine, useThemeMode } from "@rxdrag/react-core"
import { ComponentTree } from "./ComponentTree"
import { ID } from "@rxdrag/shared"
import { NavButton } from "../common/NavButton"
import { FlowEditor } from "./FlowEditor"
import { controllerActivities } from "../minion-materials/controller"
import { LogicflowContextParam } from "../types"

const Content = styled.div`
  flex: 1;
  position: relative;
`

enum NavType {
  componentTree = "componentTree",
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
  model = "model",
}

export const FlowDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)
  const [selectedFlow, setSelectedFolw] = useState<ID>()
  const [selectedFx, setSelectedFx] = useState<ID>()
  const engine = useDesignerEngine()

  const { token } = theme.useToken()
  const themMode = useThemeMode()
  const materials = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materials: IActivityMaterial<ReactNode>[] = [...(controllerActivities as any)]
    return materials.concat(...activityMaterialCategories.map(category => category.materials))
  }, [])

  const handleToggleComponents = useCallback(() => {
    setNavType(type => type === NavType.componentTree ? null : NavType.componentTree)
  }, [])

  const handleToggleModel = useCallback(() => {
    setNavType(type => type === NavType.model ? null : NavType.model)
  }, [])


  const handleToggleToolbox = useCallback(() => {
    setNavType(type => type === NavType.toolbox ? null : NavType.toolbox)
  }, [])

  const handleToggleFlows = useCallback(() => {
    setNavType(type => type === NavType.flows ? null : NavType.flows)
  }, [])

  const handleToggleFxes = useCallback(() => {
    setNavType(type => type === NavType.fxes ? null : NavType.fxes)
  }, [])

  const handleCloseLeft = useCallback(() => {
    setNavType(null)
  }, [])

  const handleSelectFlow = useCallback((id: ID) => {
    setSelectedFolw(id)
    setSelectedFx(undefined)
  }, [])

  const handleSelectFx = useCallback((id: ID) => {
    setSelectedFolw(undefined)
    setSelectedFx(id)
  }, [])

  const logicFlowContextParam: LogicflowContextParam = useMemo(() => ({
    engine
  }), [engine])

  return (
    <LogicFlowEditorAntd5Scope
      themMode={themMode}
      token={token}
      materials={materials}
      locales={activityMaterialLocales}
      logicFlowContext={logicFlowContextParam}
    >
      <Container>
        <LeftNav>
          <Tooltip title="元件箱" placement="right">
            <NavButton
              type={navType === NavType.toolbox ? "primary" : "text"}
              icon={<ControlOutlined />}
              onClick={handleToggleToolbox}
            />
          </Tooltip>
          <Tooltip title="组件树" placement="right">
            <NavButton
              type={navType === NavType.componentTree ? "primary" : "text"}
              icon={<PartitionOutlined />}
              onClick={handleToggleComponents}
            />
          </Tooltip>
          <Tooltip title="数据模型" placement="right">
            <NavButton
              type={navType === NavType.model ? "primary" : "text"}
              icon={<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="currentColor" width="1em" height="1em"><path d="M138.715429 781.568l336.420571 191.140571c24.868571 14.153143 48 14.573714 73.728 0l336.420571-191.140571c39.862857-22.710857 61.714286-45.860571 61.714286-107.995429V334.134857c0-47.561143-18.852571-74.569143-53.997714-94.72l-302.994286-172.269714c-52.717714-30.427429-104.155429-29.988571-156.013714 0l-302.994286 172.288c-35.145143 20.132571-53.997714 47.140571-53.997714 94.72v339.419428c0 62.134857 21.851429 85.284571 61.714286 107.995429zM512 476.013714L185.417143 291.291429l279.003428-159.451429c32.585143-18.413714 61.714286-18.834286 95.158858 0l278.985142 159.451429zM179.017143 721.554286c-24.448-13.714286-32.585143-27.008-32.585143-50.139429V351.707429l329.563429 188.16v350.555428z m665.984 0l-296.996572 168.850285V539.849143l329.563429-188.141714V671.451429c0 23.131429-8.137143 36.425143-32.566857 50.139428z"></path></svg>}
              onClick={handleToggleModel}
            />
          </Tooltip>
          <Tooltip title="行为流" placement="right">
            <NavButton
              type={
                navType === NavType.flows
                  ? "primary"
                  : (selectedFlow ? "link" : "text")
              }
              className={selectedFlow ? "intermediate" : undefined}
              icon={<NodeIndexOutlined />}
              onClick={handleToggleFlows}
            />
          </Tooltip>

          <Tooltip title="子流" placement="right">
            <NavButton
              type={
                navType === NavType.fxes
                  ? "primary"
                  : (selectedFx ? "link" : "text")
              }
              className={selectedFx ? "intermediate" : undefined}
              icon={<FunctionOutlined />}
              onClick={handleToggleFxes}
            />
          </Tooltip>
        </LeftNav>
        <LeftColumn
          width={260}
          maxWidth={500}
          minWidth={160}
          className={!navType ? "hidden" : undefined}
        >
          <PanelTitle>
            {
              NavType.componentTree === navType &&
              <span>
                组件树
              </span>
            }
            {
              NavType.toolbox === navType &&
              <span>
                元件箱
              </span>
            }
            {
              NavType.flows === navType &&
              <span>
                逻辑编排
              </span>
            }
            {
              NavType.fxes === navType &&
              <span>
                子编排
              </span>
            }
            <Button
              type="text"
              size="small"
              icon={<CloseOutlined />}
              onClick={handleCloseLeft}
            />
          </PanelTitle>
          {
            navType === NavType.toolbox &&
            <Toolbox materialCategories={activityMaterialCategories} />
          }
          <ComponentTree
            display={navType === NavType.componentTree}
          />
          <Flows
            display={navType === NavType.flows}
            selected={selectedFlow}
            onSelect={handleSelectFlow}
          />
          <FXes
            display={navType === NavType.fxes}
            selected={selectedFx}
            onSelect={handleSelectFx}
          />
        </LeftColumn>
        <Content>
          {
            (selectedFlow || selectedFx) &&
            <FlowEditor
              flowId={selectedFlow || selectedFx || ""}
              icon={selectedFx ? <FunctionOutlined /> : <NodeIndexOutlined />}
            />
          }
        </Content>
      </Container>
    </LogicFlowEditorAntd5Scope>
  )
})