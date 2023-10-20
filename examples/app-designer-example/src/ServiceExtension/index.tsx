import { ResizableColumn } from "@rxdrag/react-shared"
import { ReactNode, memo, useMemo, useState } from "react"
import styled from "styled-components"
import { LogicTree } from "./LogicTree"
import { MetaContext } from "./contexts"
import { useQueryAppMeta } from "../hooks/useQueryAppMeta"
import { ScriptEditor } from "./ScriptEditor"
import { ID } from "@rxdrag/shared"
import { LogicFlowEditorAntd5Scope } from "@rxdrag/logicflow-editor-antd5"
import { useAppThemeMode } from "../hooks/useAppThemeMode"
import { theme } from "antd"
import { backendActivityMaterialCategories, backendActivityMaterialLocales } from "./LogicEditor/minion-materials"
import { ILogicFlowContext } from "./LogicEditor/contexts"
import { useQueryAppExtensionLogicFlows } from "../hooks/useQueryAppExtensionLogicFlows"
import { OperateType } from "../interfaces/extension"
import { IActivityMaterial } from "@rxdrag/minions-schema"
import { fxFlowMaterial } from "./LogicEditor/minion-materials/fxFlow"
import _ from "lodash"
import { appDesignerLocales } from "../locales"
import { LogicEditor } from "./LogicEditor"
import { Fieldy } from "@rxdrag/react-fieldy"

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-flow: row;
  height: 0;
  .model-tree-shell{
    flex:1;
    display: flex;
    flex-flow: column;
    background-color: ${props => props.theme.token?.colorBgBase};
    border: solid 1px ${props => props.theme.token?.colorBorderSecondary};
    border-left: 0;
    height: 0;
    overflow: auto;
  }

  box-sizing: border-box;
`
const LeftColumn = styled(ResizableColumn)`
  border: solid 1px;
`

export const ServiceExtension = memo(() => {
  const [selectedLogicFlow, setSelectedLogicFlow] = useState<ID>();
  const [selectedScript, setSelectedScript] = useState<ID>();
  const themMode = useAppThemeMode()
  const { token } = theme.useToken()
  const { meta } = useQueryAppMeta("app1")
  const { flows } = useQueryAppExtensionLogicFlows("app1")

  const logicFlowContextParam: ILogicFlowContext = useMemo(() => ({
    fxFlowMetas: flows?.filter(flow => flow.operateType === OperateType.SubMethod) || [],
  }), [flows])

  const materials = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const materials: IActivityMaterial<ReactNode, any, any, any>[] = [fxFlowMaterial]
    return materials.concat(...backendActivityMaterialCategories.map(category => category.materials))
  }, [])

  const locales = useMemo(() => {
    return _.merge(appDesignerLocales, backendActivityMaterialLocales)
  }, [])

  return (
    <Fieldy>
      <LogicFlowEditorAntd5Scope
        themMode={themMode}
        token={token}
        materials={materials}
        locales={locales}
        logicFlowContext={logicFlowContextParam}
      >
        <MetaContext.Provider value={meta?.publishedContent}>
          <Container>
            <LeftColumn minWidth={50} maxWidth={500} width={260}>
              <div className="model-tree-shell">
                <LogicTree
                  flows={flows}
                  selectedScript={selectedScript}
                  selectedLogicFlow={selectedLogicFlow}
                  onSelectLogicFlow={setSelectedLogicFlow}
                  onSelectScript={setSelectedScript}
                />
              </div>
            </LeftColumn>
            <ScriptEditor id={selectedScript} />
            <LogicEditor id={selectedLogicFlow} />
          </Container>
        </MetaContext.Provider>
      </LogicFlowEditorAntd5Scope>
    </Fieldy>
  )
})