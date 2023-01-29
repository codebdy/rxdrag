import { memo, useCallback, useMemo, useReducer, useState } from "react"
import styled from "styled-components";
import { initialState, IReactionsEditorParams, IState, ReacionsEditorContext } from "../contexts"
import { useCreateGraph } from "../hooks/useCreateGraph";
import { mainReducer } from "../reducers/mainReducer";
import { Logic } from "./Logic";
import { PropertyBox } from "./PropertyBox";
import { Toolbar } from "./Toolbar";
import { Toolbox } from "./Toolbox";

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
  left: 16px;
  bottom: 16px;
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
  width: 220px;
  border-left: ${props => props.theme.token?.colorBorder}  solid 1px;
  display: flex;
  flex-flow: column;
`

export const ReactionMetaEditor = memo(() => {
  const [showMap, setShowMap] = useState(false)
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const graph = useCreateGraph()
  
  const params: IReactionsEditorParams = useMemo(() => {
    return {
      graph,
      ...(state as IState),
      dispatch,
    }
  }, [graph, state])

  const handleToggleMap = useCallback(() => {
    setShowMap((show) => !show)
  }, [])

  return (
    <ReacionsEditorContext.Provider value={params}>
      <CenterArea>
        <Toolbar showMap={showMap} toggleShowMap={handleToggleMap} />
        <OpeateArea>
          <Toolbox />
          <CanvasArea>
            <CanvasContainer id="reactions-canvas-container" >
              <Logic />
            </CanvasContainer>
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
        <PropertyBox />
      </RightArea>
    </ReacionsEditorContext.Provider>
  )
})