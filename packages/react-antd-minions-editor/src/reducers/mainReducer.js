import { initialState } from "../interfaces/state";
import { changeFlagReducer } from "./changeFlagReducer";
import { metasReducer } from "./metasReducer";
import { redoListReducer } from "./redoListReducer";
import { selectedReducer } from "./selectedReducer";
import { undoListReducer } from "./undoListReducer";
import { zoomReducer } from "./zoomReducer";
export const mainReducer = ({ changeFlag, redoList, undoList, metas, selected, zoom } = initialState, action) => ({
    changeFlag: changeFlagReducer(changeFlag, action),
    redoList: redoListReducer(redoList, action),
    undoList: undoListReducer(undoList, action),
    metas: metasReducer(metas, action),
    selected: selectedReducer(selected, action),
    zoom: zoomReducer(zoom, action),
});
