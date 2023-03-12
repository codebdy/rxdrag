function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
function _objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if (typeof Object.getOwnPropertySymbols === 'function') {
            ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
                return Object.getOwnPropertyDescriptor(source, sym).enumerable;
            }));
        }
        ownKeys.forEach(function(key) {
            _defineProperty(target, key, source[key]);
        });
    }
    return target;
}
function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) {
            symbols = symbols.filter(function(sym) {
                return Object.getOwnPropertyDescriptor(object, sym).enumerable;
            });
        }
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function _objectSpreadProps(target, source) {
    source = source != null ? source : {};
    if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
        ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
import { DocumentSelectionMode } from "interfaces";
import { rootId } from "./rootId";
import { selectedIds } from "./selectedIds";
import { selectionMode } from "./selectionMode";
import { history } from "./history";
import { snapShotIndex } from "./snapShotIndex";
import { canvasWidth } from "./canvasWidth";
import { canvasWidthLimits } from "./canvasWidthLimits";
import { viewType } from "./viewType";
const initialState = {
    selectionMode: DocumentSelectionMode.Normal,
    changed: false,
    history: [],
    selectedIds: null,
    snapshotIndex: 0,
    canvasWidth: null,
    canvasWidthLimits: null,
    viewType: "design"
};
export function documentReduce(state = initialState, action) {
    return _objectSpreadProps(_objectSpread({}, state), {
        selectionMode: selectionMode(state.selectionMode, action),
        rootId: rootId(state.rootId, action),
        selectedIds: selectedIds(state.selectedIds, action),
        history: history(state.history, action),
        snapshotIndex: snapShotIndex(state.snapshotIndex, action),
        canvasWidth: canvasWidth(state.canvasWidth, action),
        canvasWidthLimits: canvasWidthLimits(state.canvasWidthLimits, action),
        viewType: viewType(state.viewType, action)
    });
}

//# sourceMappingURL=index.js.map