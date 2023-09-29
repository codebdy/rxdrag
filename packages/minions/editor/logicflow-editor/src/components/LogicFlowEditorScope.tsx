import { ReactNode, memo, useEffect, useMemo, useState } from "react"
import { CanBeReferencedLogicFlowMetasContext, GraphContext, LogicFlowContext, LogicFlowEditorStoreContext, MaterialsContext, ThemeTokenContext } from "../contexts";
import { EditorStore } from "../classes";
import { ThemeProvider } from "styled-components";
import { IThemeToken } from "../interfaces";
import { IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema";
import { Graph } from "@antv/x6";

export type LogicFlowEditorScopeProps = {
  themMode?: "dark" | "light",
  token: IThemeToken,
  materials: IActivityMaterial<ReactNode>[],
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
  children?: React.ReactNode
}

//编辑器Scope定义
export const LogicFlowEditorScope = memo((
  props: LogicFlowEditorScopeProps,
) => {
  const { themMode, token, materials, logicFlowContext, canBeReferencedLogflowMetas, children } = props;
  const graphState = useState<Graph>()
  const materialsState = useState<IActivityMaterial[]>([])
  const [, setMaterials] = materialsState
  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      mode: themMode,
      token
    }
  }, [themMode, token])


  const store: EditorStore = useMemo(() => {
    return new EditorStore()
  }, [])

  useEffect(() => {
    setMaterials(mats => {
      materials
      return [...mats.filter(mat => !materials.find(m => m.activityName === mat.activityName)), ...materials]
    })
  }, [materials, setMaterials])

  return (
    <LogicFlowEditorStoreContext.Provider value={store}>
      <ThemeProvider theme={theme}>
        <ThemeTokenContext.Provider value={token}>
          <LogicFlowContext.Provider value={logicFlowContext}>
            <MaterialsContext.Provider value={materialsState}>
              <CanBeReferencedLogicFlowMetasContext.Provider value={canBeReferencedLogflowMetas || []}>
                <GraphContext.Provider value={graphState}>
                  {children}
                </GraphContext.Provider>
              </CanBeReferencedLogicFlowMetasContext.Provider>
            </MaterialsContext.Provider>
          </LogicFlowContext.Provider>
        </ThemeTokenContext.Provider>
      </ThemeProvider>
    </LogicFlowEditorStoreContext.Provider>
  )
})