import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import styled from "styled-components";
import { ActionType } from "../actions";
import { EditorStore } from "../classes/EditorStore";
import { GraphContext, ReacionsEditorStoreContext } from "../contexts";
import { useCreateGraph } from "../hooks/useCreateGraph";
import { Logic } from "./Logic";
import { PropertyBox } from "./PropertyBox";
import { Toolbar } from "./Toolbar";
import { Toolbox } from "./Toolbox/Toolbox";
const CenterArea = styled.div `
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
  height: 100%;
`;
const OpeateArea = styled.div `
  position: relative;
  flex:1;
  display: flex;
  width: 100%;
  height: 0;
`;
const CanvasArea = styled.div `
  position: relative;
  flex:1;
  display: flex;
  flex-flow: column;
`;
const CanvasContainer = styled.div `
  position: relative;
  flex: 1;
  background-color: ${props => props.theme.token?.colorBgContainer};
`;
const MiniMapContainer = styled.div `
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
`;
const RightArea = styled.div `
  width: 280px;
  border-left: ${props => props.theme.token?.colorBorder}  solid 1px;
  display: flex;
  flex-flow: column;
`;
export const ReactionMetaEditor = memo((props) => {
    const { metas, onChange, toolbox } = props;
    const emptyMetas = useMemo(() => ({
        reactions: [],
        invokes: []
    }), []);
    const [showMap, setShowMap] = useState(false);
    //const [state, dispatch] = useReducer(mainReducer, initialState);
    const graph = useCreateGraph();
    const store = useMemo(() => {
        return new EditorStore();
    }, []);
    useEffect(() => {
        store.dispatch({ type: ActionType.SET_METAS, payload: metas || emptyMetas });
    }, [emptyMetas, metas, store]);
    const handleToggleMap = useCallback(() => {
        setShowMap((show) => !show);
    }, []);
    const handleChange = useCallback((newMetas) => {
        onChange(newMetas);
    }, [onChange]);
    return (_jsx(GraphContext.Provider, { value: graph, children: _jsxs(ReacionsEditorStoreContext.Provider, { value: store, children: [_jsxs(CenterArea, { children: [_jsx(Toolbar, { showMap: showMap, toggleShowMap: handleToggleMap }), _jsxs(OpeateArea, { children: [_jsx(Toolbox, { children: toolbox }), _jsxs(CanvasArea, { children: [_jsx(CanvasContainer, { id: "reactions-canvas-container", children: _jsx(Logic, { onChange: handleChange }) }), _jsx(MiniMapContainer, { id: "reactions-minimap-container", style: {
                                                display: showMap ? "flex" : "none"
                                            } })] })] })] }), _jsx(RightArea, { children: _jsx(PropertyBox, {}) })] }) }));
});
