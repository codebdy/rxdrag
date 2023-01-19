import { Action } from "../actions";
import { IState } from "../contexts";
import { liningReducer } from "./liningReducer";
import { metasReducer } from "./metasReducer";
import { redoListReducer } from "./redoListReducer";
import { undoListReducer } from "./undoListReducer";

export const mainReducer = (
  { lining, redoList, undoList, metas }: IState,
  action: Action
) => ({
  redoList: redoListReducer(redoList, action),
  undoList: undoListReducer(undoList, action),
  lining: liningReducer(lining, action),
  metas: metasReducer(metas, action),
});
