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
import { REMOVE_DOCUMENT } from "actions/registry";
import { documentReduce } from "./document";
export function documentsById(state, action) {
    if (action) {
        var _action_payload;
        if ((_action_payload = action.payload) === null || _action_payload === void 0 ? void 0 : _action_payload.documentId) {
            var _action_payload1, _action_payload2;
            if (action.type === REMOVE_DOCUMENT) {
                var _action_payload3;
                return _objectSpreadProps(_objectSpread({}, state), {
                    [(_action_payload3 = action.payload) === null || _action_payload3 === void 0 ? void 0 : _action_payload3.documentId]: undefined
                });
            }
            return _objectSpreadProps(_objectSpread({}, state), {
                [(_action_payload1 = action.payload) === null || _action_payload1 === void 0 ? void 0 : _action_payload1.documentId]: documentReduce(state[(_action_payload2 = action.payload) === null || _action_payload2 === void 0 ? void 0 : _action_payload2.documentId], action)
            });
        }
    }
    return state;
}

//# sourceMappingURL=index.js.map