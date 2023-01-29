import { Action } from "../actions";
import { IState } from "../contexts";
import { changeFlagReducer } from "./changeFlagReducer";
import { liningReducer } from "./liningReducer";
import { metasReducer } from "./metasReducer";
import { redoListReducer } from "./redoListReducer";
import { selectedReducer } from "./selectedReducer";
import { undoListReducer } from "./undoListReducer";
import { zoomReducer } from "./zoomReducer";

export const mainReducer = (
  { changeFlag, lining, redoList, undoList, metas, selected, zoom }: IState,
  action: Action
): IState => ({
  changeFlag: changeFlagReducer(changeFlag, action),
  redoList: redoListReducer(redoList, action),
  undoList: undoListReducer(undoList, action),
  lining: liningReducer(lining, action),
  metas: metasReducer(metas, action),
  selected: selectedReducer(selected, action),
  zoom: zoomReducer(zoom, action),
});
