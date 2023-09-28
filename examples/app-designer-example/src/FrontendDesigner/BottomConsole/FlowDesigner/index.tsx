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
import { useThemeMode } from "@rxdrag/react-core"
import { ComponentTree } from "./ComponentTree"
import { ID } from "@rxdrag/shared"
import { NavButton } from "../common/NavButton"
import { FlowEditor } from "./FlowEditor"

const Content = styled.div`
  flex: 1;
  position: relative;
`


enum NavType {
  componentTree = "componentTree",
  toolbox = "toolbox",
  flows = "flows",
  fxes = "fxes",
}

export const FlowDesigner = memo(() => {
  const [navType, setNavType] = useState<NavType | null>(NavType.flows)
  const [selectedFlow, setSelectedFolw] = useState<ID>()
  const [selectedFx, setSelectedFx] = useState<ID>()

  const { token } = theme.useToken()
  const themMode = useThemeMode()
  const materials = useMemo(() => {
    const materials: IActivityMaterial<ReactNode>[] = []
    return materials.concat(...activityMaterialCategories.map(category => category.materials))
  }, [])

  const handleToggleComponents = useCallback(() => {
    setNavType(type => type === NavType.componentTree ? null : NavType.componentTree)
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

  return (
    <LogicFlowEditorAntd5Scope
      themMode={themMode}
      token={token}
      materials={materials}
      locales={activityMaterialLocales}
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