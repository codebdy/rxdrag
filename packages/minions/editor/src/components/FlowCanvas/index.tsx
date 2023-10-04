import { memo } from "react"
import { useCreateGraph, useEditorStore, useShowMap } from "../../hooks";
import { ILogicMetas } from "../../interfaces";
import styled from "styled-components";
import { Logic } from "../Logic";
import { useThemeToken } from "../../hooks/useThemeToken";

const CanvasArea = styled.div`
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
  width: 0;
  background-color: ${props => props.theme.token?.colorBgContainer};
  //overflow: auto;
  box-sizing: border-box;
`
const CanvasContainer = styled.div`
  position: relative;
  flex: 1;
  box-sizing: border-box;
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

export const FlowCanvas = memo((
  props: {
    value?: ILogicMetas,
    onChange?: (value: ILogicMetas) => void,
    children?: React.ReactNode,
  }
) => {
  const { value, onChange, children } = props;
  const { showMap } = useShowMap()
  const store = useEditorStore()
  const token = useThemeToken()
  useCreateGraph(token, store)
  return (
    <CanvasArea>
      <CanvasContainer id="reactions-canvas-container" >
        <Logic value={value} onChange={onChange} />
      </CanvasContainer>
      {children}
      <MiniMapContainer
        id="reactions-minimap-container"
        style={{
          display: showMap ? "flex" : "none"
        }}
      />
    </CanvasArea>
  )
})