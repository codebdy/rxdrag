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
import { ADD_NODES, CHANGE_NODE_META, DELETE_NODES, INITIALIZE, MOVE_NODES, RECOVER_SNAPSHOT, REMOVE_DOCUMENT, REMOVE_SLOT } from "actions/registry";
import { invariant } from "utils/util-invariant";
import { NodeRelativePosition } from "../interfaces/document";
export function nodesById(state = {}, action) {
    const { payload  } = action;
    switch(action.type){
        case INITIALIZE:
            return (payload === null || payload === void 0 ? void 0 : payload.nodesById) || {};
        case ADD_NODES:
            return addNods(state, action);
        case MOVE_NODES:
            return moveNodes(state, action);
        case DELETE_NODES:
            return remove(state, payload.sourceIds);
        case CHANGE_NODE_META:
            return changeNodeMeta(state, payload);
        case RECOVER_SNAPSHOT:
            return revoverSnapshot(state, action);
        case REMOVE_SLOT:
            return removeSlot(state, action);
        case REMOVE_DOCUMENT:
            const newState = {};
            for (const key of Object.keys(state)){
                var _state_key, _action_payload;
                if (((_state_key = state[key]) === null || _state_key === void 0 ? void 0 : _state_key.documentId) !== ((_action_payload = action.payload) === null || _action_payload === void 0 ? void 0 : _action_payload.documentId)) {
                    newState[key] = state[key];
                }
            }
            return newState;
        default:
            return state;
    }
}
function addNods(state = {}, action) {
    const { payload  } = action;
    const addPlayload = payload;
    const { pos , slot  } = addPlayload;
    const newState = Object.assign({}, state, addPlayload.nodes.nodesById);
    const sourceIds = addPlayload.nodes.rootNodes.map((node)=>node.id);
    if (pos === NodeRelativePosition.InTop || pos === NodeRelativePosition.InBottom) {
        return addIn(newState, sourceIds, addPlayload.targetId, pos);
    } else if (pos === NodeRelativePosition.Before || pos === NodeRelativePosition.After) {
        return addSiblings(newState, sourceIds, addPlayload.targetId, pos);
    } else if (slot) {
        return addSlot(newState, addPlayload.targetId, slot, sourceIds[0]);
    }
    return newState;
}
function moveNodes(state = {}, action) {
    const { payload  } = action;
    const movePlayload = payload;
    const movePos = movePlayload.pos;
    const newState = Object.assign({}, state);
    for (const targetId of movePlayload.sourceIds){
        var _parentNode_children;
        const targetNode = state[targetId];
        invariant(targetNode, "can not find target node");
        const parentNode = state[targetNode.parentId || ""];
        //从父节点中删除
        newState[targetNode.parentId || ""] = Object.assign({}, parentNode, {
            children: parentNode === null || parentNode === void 0 ? void 0 : (_parentNode_children = parentNode.children) === null || _parentNode_children === void 0 ? void 0 : _parentNode_children.filter((id)=>id !== targetId)
        });
        //再加入
        if (movePos === NodeRelativePosition.InTop || movePos === NodeRelativePosition.InBottom) {
            return addIn(newState, movePlayload.sourceIds, movePlayload.targetId, movePos);
        } else if (movePos === NodeRelativePosition.Before || movePos === NodeRelativePosition.After) {
            return addSiblings(newState, movePlayload.sourceIds, movePlayload.targetId, movePos);
        }
    }
    return newState;
}
function addIn(state, sourceIds, targetId, pos) {
    const targetNode = state[targetId];
    invariant(targetNode, "can not find target node");
    const newChildren = pos === NodeRelativePosition.InBottom ? [
        ...targetNode.children,
        ...sourceIds
    ] : [
        ...sourceIds,
        ...targetNode.children
    ];
    let newState = Object.assign({}, state, {
        [targetNode.id]: _objectSpreadProps(_objectSpread({}, targetNode), {
            children: newChildren
        })
    });
    for (const id of sourceIds){
        newState = _objectSpreadProps(_objectSpread({}, newState), {
            [id]: _objectSpreadProps(_objectSpread({}, newState[id]), {
                parentId: targetId
            })
        });
    }
    return newState;
}
//未调试
function addSiblings(state, sourceIds, targetId, pos) {
    const targetNode = state[targetId];
    invariant(targetNode, "can not find target node");
    const parentNode = state[targetNode.parentId || ""];
    invariant(parentNode, "can not find parent on target node");
    const targetIndex = parentNode.children.indexOf(targetId) + (pos === NodeRelativePosition.After ? 1 : 0);
    const newSibings = parentNode.children.slice(0, targetIndex).concat(sourceIds).concat(parentNode.children.slice(targetIndex));
    let newState = Object.assign({}, state, {
        [parentNode.id]: _objectSpreadProps(_objectSpread({}, parentNode), {
            children: newSibings
        })
    });
    for (const id of sourceIds){
        newState = _objectSpreadProps(_objectSpread({}, newState), {
            [id]: _objectSpreadProps(_objectSpread({}, newState[id]), {
                parentId: targetNode.parentId
            })
        });
    }
    return newState;
}
function remove(state, targetIds) {
    const newState = {};
    for (const key of Object.keys(state)){
        if (!targetIds.find((id)=>id === key)) {
            var _newState_key_children;
            newState[key] = state[key];
            if ((_newState_key_children = newState[key].children) === null || _newState_key_children === void 0 ? void 0 : _newState_key_children.find((childId)=>targetIds.find((id)=>id === childId))) {
                newState[key] = _objectSpreadProps(_objectSpread({}, newState[key]), {
                    children: newState[key].children.filter((childId)=>!targetIds.find((id)=>id === childId))
                });
            }
            for (const slotName of Object.keys(newState[key].slots || {})){
                var _newState_key_slots;
                const slotId = ((_newState_key_slots = newState[key].slots) === null || _newState_key_slots === void 0 ? void 0 : _newState_key_slots[slotName]) || "";
                if (targetIds.find((id)=>id === slotId)) {
                    var _newState_key_slots1;
                    (_newState_key_slots1 = newState[key].slots) === null || _newState_key_slots1 === void 0 ? void 0 : delete _newState_key_slots1[slotName];
                }
            }
        }
    }
    return newState;
}
function changeNodeMeta(state, payload) {
    const node = state[payload.id];
    return _objectSpreadProps(_objectSpread({}, state), {
        [payload.id]: _objectSpreadProps(_objectSpread({}, node), {
            meta: payload.meta
        })
    });
}
function revoverSnapshot(state, action) {
    var _action_payload;
    const newState = Object.assign({}, ((_action_payload = action.payload) === null || _action_payload === void 0 ? void 0 : _action_payload.snapshot.nodes) || {});
    for (const key of Object.keys(state)){
        var _action_payload1;
        const node = state[key];
        if (node.documentId !== ((_action_payload1 = action.payload) === null || _action_payload1 === void 0 ? void 0 : _action_payload1.documentId)) {
            newState[key] = node;
        }
    }
    return newState;
}
function removeSlot(state, action) {
    var _action_payload;
    const nodeId = (_action_payload = action.payload) === null || _action_payload === void 0 ? void 0 : _action_payload.nodeId;
    if (action.payload && nodeId) {
        let newState = _objectSpread({}, state);
        const node = state[nodeId];
        const newSlots = {};
        for (const slotName of Object.keys(node.slots || {})){
            if (slotName !== action.payload.slotName) {
                var _node_slots;
                newSlots[slotName] = (_node_slots = node.slots) === null || _node_slots === void 0 ? void 0 : _node_slots[slotName];
            }
        }
        if (node) {
            newState[nodeId] = _objectSpreadProps(_objectSpread({}, node), {
                slots: newSlots
            });
        }
        for (const id of Object.keys(newState)){
            var _node_slots1, _action_payload1;
            if (id === ((_node_slots1 = node.slots) === null || _node_slots1 === void 0 ? void 0 : _node_slots1[(_action_payload1 = action.payload) === null || _action_payload1 === void 0 ? void 0 : _action_payload1.slotName])) {
                delete newState[id];
            }
        }
        return newState;
    }
    return state;
}
function addSlot(state, targetId, slotName, slotId) {
    if (targetId) {
        let newState = _objectSpread({}, state);
        const node = state[targetId];
        const newSlots = _objectSpreadProps(_objectSpread({}, node.slots), {
            [slotName]: slotId
        });
        newState[targetId] = _objectSpreadProps(_objectSpread({}, node), {
            slots: newSlots
        });
        if (slotId) {
            newState[slotId] = _objectSpreadProps(_objectSpread({}, newState[slotId]), {
                parentId: targetId
            });
        }
        return newState;
    }
    return state;
}

//# sourceMappingURL=nodesById.js.map