import { Action } from "../actions";
import { IState } from "../contexts";
import { liningReducer } from "./liningReducer";
import { metasReducer } from "./metasReducer";
import { redoListReducer } from "./redoListReducer";
import { selectedReducer } from "./selectedReducer";
import { undoListReducer } from "./undoListReducer";
import { zoomReducer } from "./zoomReducer";

export const mainReducer = (
  { lining, redoList, undoList, metas, selected, zoom }: IState,
  action: Action
): IState => ({
  redoList: redoListReducer(redoList, action),
  undoList: undoListReducer(undoList, action),
  lining: liningReducer(lining, action),
  metas: metasReducer(metas, action),
  selected: selectedReducer(selected, action),
  zoom: zoomReducer(zoom, action),
});
