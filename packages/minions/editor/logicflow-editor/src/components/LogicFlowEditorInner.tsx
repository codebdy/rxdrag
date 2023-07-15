import React, { ReactNode } from "react";
import { memo, useCallback, useEffect, useMemo } from "react"
import styled, { ThemeProvider } from "styled-components";
import { ActionType, SetMetasAction } from "../actions";
import { CanBeReferencedLogicFlowMetasContext, GraphContext, LogicFlowContext, MaterialsContext, ThemeTokenContext } from "../contexts"
import { useCreateGraph } from "../hooks/useCreateGraph";
import { Logic } from "./Logic";
import { ILogicMetas, IThemeToken } from "../interfaces";
import { Toolbar } from "./Toolbar";
import { Toolbox } from "./Toolbox";
import { PropertyBox } from "./PropertyBox";
import { IActivityMaterial, ILogicFlowDefine } from "@rxdrag/minions-schema";
import { LogicFlowEditorScope } from "./LogicFlowEditorScope";
import { useEditorStore } from "../hooks";
import { useShowMap } from "../hooks/useShowMap";

const EditorShell = styled.div`
  display: flex;
  flex:1;
  width: 100%;
  height: 100%;
`

const CenterArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
  height: 100%;
`
const OpeateArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  width: 100%;
  height: 0;
`

const CanvasArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
`

const CanvasContainer = styled.div`
  position: relative;
  flex: 1;
  background-color: ${props => props.theme.token?.colorBgContainer};
`
const MiniMapContainer = styled.div`
  position: absolute;
  width: 240px;
  height: 160px;
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  background-color: ${props => props.theme.token?.colorBgContainer};
  right: 8px;
  bottom: 8px;
  border-radius: 8px;
  box-shadow: 0 2px 5px 1px rgba(0, 0, 0, 0.06);
  display: flex;
  align-items: center;
  justify-content: center; 
  overflow: hidden;
  .x6-widget-minimap{
    background-color: transparent;
    overflow: visible;
    .x6-graph{
      box-shadow: none;
    }
  }
`

const RightArea = styled.div`
  width: 280px;
  border-left: ${props => props.theme.token?.colorBorder}  solid 1px;
  display: flex;
  flex-flow: column;
`

export type LogicFlowEditorProps = {
  value?: ILogicMetas,
  onChange?: (value: ILogicMetas) => void,
  toolbox?: React.ReactNode,
  toolbar?: React.ReactNode,
  propertyBox?: React.ReactNode,
  materials: IActivityMaterial<ReactNode>[],
  token: IThemeToken,
  logicFlowContext?: unknown,
  canBeReferencedLogflowMetas?: ILogicFlowDefine[],
  children?: React.ReactNode,
}

export const LogicFlowEditorInner = memo((
  props: LogicFlowEditorProps
) => {
  const { value, onChange, toolbox, toolbar, propertyBox, materials, token, logicFlowContext, canBeReferencedLogflowMetas, children } = props
  const emptyMetas = useMemo(() => ({
    nodes: [],
    lines: []
  }), [])

  const store = useEditorStore()

  const graph = useCreateGraph(token, store)
  const { showMap } = useShowMap()

  useEffect(() => {
    const action: SetMetasAction = { type: ActionType.SET_METAS, payload: { nodes: value?.nodes || [], lines: value?.lines || [] } }
    store?.dispatch(action)
  }, [emptyMetas, value, store])

  const handleChange = useCallback((newMetas: ILogicMetas) => {
    onChange?.(newMetas)
  }, [onChange])

  const theme: { token: IThemeToken } = useMemo(() => {
    return {
      token
    }
  }, [token])

  return (
    <LogicFlowEditorScope>
      <ThemeProvider theme={theme}>
        <LogicFlowContext.Provider value={logicFlowContext}>
          <ThemeTokenContext.Provider value={token}>
            <MaterialsContext.Provider value={materials}>
              <CanBeReferencedLogicFlowMetasContext.Provider value={canBeReferencedLogflowMetas || []}>
                <GraphContext.Provider value={graph}>

                  <EditorShell>
                    <CenterArea>
                      {
                        toolbar &&
                        <Toolbar>
                          {toolbar}
                        </Toolbar>
                      }

                      <OpeateArea>
                        <Toolbox>
                          {toolbox}
                        </Toolbox>
                        <CanvasArea>
                          <CanvasContainer id="reactions-canvas-container" >
                            <Logic onChange={handleChange} />
                          </CanvasContainer>
                          {children}
                          <MiniMapContainer
                            id="reactions-minimap-container"
                            style={{
                              display: showMap ? "flex" : "none"
                            }}
                          />
                        </CanvasArea>
                      </OpeateArea>
                    </CenterArea>
                    <RightArea>
                      <PropertyBox>
                        {propertyBox}
                      </PropertyBox>
                    </RightArea>
                  </EditorShell>
                </GraphContext.Provider>
              </CanBeReferencedLogicFlowMetasContext.Provider>
            </MaterialsContext.Provider>
          </ThemeTokenContext.Provider>
        </LogicFlowContext.Provider>
      </ThemeProvider>
    </LogicFlowEditorScope>
  )
})