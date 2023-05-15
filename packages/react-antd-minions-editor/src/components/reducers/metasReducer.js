import { ActionType } from "../actions";
export function metasReducer(state, action) {
    switch (action.type) {
        case ActionType.SET_METAS: {
            return action.payload;
        }
        case ActionType.ADD_NODE: {
            return { ...state, reactions: [...state.reactions, action.payload] };
        }
        case ActionType.CHANGE_NODE: {
            const changeNodeAction = action;
            return { ...state, reactions: [...state.reactions.filter(reaction => reaction.id !== changeNodeAction.payload.id), changeNodeAction.payload] };
        }
        case ActionType.ADD_EDGE: {
            return { ...state, invokes: [...state.invokes, action.payload] };
        }
        case ActionType.CHANGE_EDGE: {
            const changeEdgeAction = action;
            return { ...state, invokes: [...state.invokes.filter(invoke => invoke.id !== changeEdgeAction.payload.id), changeEdgeAction.payload] };
        }
        case ActionType.REMOVE_NODE: {
            const removeNodeAction = action;
            return { ...state, reactions: state.reactions.filter(reaction => reaction.id !== removeNodeAction.payload) };
        }
        case ActionType.REMOVE_EDGE: {
            const removeNodeAction = action;
            return { ...state, invokes: state.invokes.filter(invoke => invoke.id !== removeNodeAction.payload) };
        }
    }
    return state;
}
