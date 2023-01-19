import { ILogicMetas } from "runner/reaction/metas";
import { Action } from "../actions";
import { metasReducer } from "./metasReducer";


const initialMetas: ILogicMetas = {
  inputs: [],
  outputs: [],
  reactions: [],
  invakes: []
}


export const initialState = {
  lining: false,
  metas: initialMetas,
}

export const mainReducer = ({ metas }: { metas: ILogicMetas }, action: Action) => ({
  metas: metasReducer(metas, action),
});
