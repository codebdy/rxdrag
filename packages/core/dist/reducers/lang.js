import { SET_LANGUAGE } from "actions/registry";
export const DefualtLang = "zh-CN";
export function lang(state, action) {
    if (action.type === SET_LANGUAGE) {
        return action.payload || DefualtLang;
    }
    return state;
}

//# sourceMappingURL=lang.js.map