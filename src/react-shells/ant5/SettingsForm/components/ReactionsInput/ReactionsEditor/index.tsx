import { memo, useCallback, useEffect, useMemo, useReducer, useRef, useState } from "react"
import styled from "styled-components";
import { Members } from "./components/Members";
import { PropertyBox } from "./components/PropertyBox";
import { Logic } from "./components/Logic";
import { useCreateGraph } from "./hooks/useCreateGraph";
import { initialState, IReactionsEditorParams, IState, ReacionsEditorContext } from "./contexts";
import { Toolbar } from "./components/Toolbar";
import { Toolbox } from "./components/Toolbox";
import { mainReducer } from "./reducers/mainReducer";
import { IControllerMeta, IReactionMeta } from "runner/reaction/interfaces/metas";
import { IEventMeta } from "./interfaces";
import { createUuid } from "./utils";

const SytledContent = styled.div`
  height: calc(100vh - 160px);
  display: flex;
  border: ${props => props.theme.token?.colorBorder} solid 1px;
  .ant-drawer-header{
    padding: 0 16px;
    min-height: 53px;
  }
  .ant-drawer-body{
    padding: 0;
    display: flex;
    flex-flow: column;
    overflow: hidden;
  };
`
const LeftArea = styled.div`
  width: 180px;
  border-right: ${props => props.theme.token?.colorBorder} solid 1px;
  padding: 8px;
  overflow: auto;
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
export const ReactionsEditor = memo((
  props: {
    events: IEventMeta[],
    value?: IControllerMeta,
    onChange?: (value?: IControllerMeta) => void,
  }
) => {
  const { events, value, onChange } = props
  const [inputValue, setInputValue] = useState<IControllerMeta>()
  const [selected, setSelected] = useState<string>()
  const [showMap, setShowMap] = useState(false)
  const [state, dispatch] = useReducer(mainReducer, initialState);
  const graph = useCreateGraph()
  const inputValueRef = useRef(inputValue)
  inputValueRef.current = inputValue

  useEffect(() => {
    setInputValue(value)
  }, [value])

  useEffect(() => {
    const eventMetas: IReactionMeta[] = [...(inputValueRef.current?.events || [])]
    for (const event of events) {
      if (!inputValueRef.current?.events?.find(evt => evt.name === event.name)) {
        eventMetas.push({
          id: createUuid(),
          name: event.name,
          label: event.label,
        })
      }
    }
    setInputValue({ ...inputValueRef.current, events: eventMetas })
  }, [events])

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

  const handleMemberChange = useCallback((meta?: IControllerMeta) => {
    setInputValue(meta)
  }, [])

  return (
    <ReacionsEditorContext.Provider value={params}>
      <SytledContent id="reactions-editor-container">
        <LeftArea>
          <Members
            value={inputValue}
            selected={selected}
            onSelect={setSelected}
            onChange={handleMemberChange}
          />
        </LeftArea>
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
      </SytledContent>
    </ReacionsEditorContext.Provider>
  )
})