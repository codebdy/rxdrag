import { Action } from "../actions";
import { initialState, IState } from "../interfaces/state";
import { changeFlagReducer } from "./changeFlagReducer";
import { metasReducer } from "./metasReducer";
import { redoListReducer } from "./redoListReducer";
import { selectedReducer } from "./selectedReducer";
import { showMapReducer } from "./showMapReducer";
import { undoListReducer } from "./undoListReducer";
import { zoomReducer } from "./zoomReducer";

export const mainReducer = (
  { changeFlag, redoList, undoList, nodes, lines, selected, zoom, showMap }: IState = initialState,
  action: Action
): IState => {
  const newState = {
    changeFlag: changeFlagReducer(changeFlag, action),
    redoList: redoListReducer(redoList, action),
    undoList: undoListReducer(undoList, action),
    ...metasReducer({ nodes, lines }, action),
    selected: selectedReducer(selected, action),
    zoom: zoomReducer(zoom, action),
    showMap: showMapReducer(showMap, action),
  }
  return newState
};
