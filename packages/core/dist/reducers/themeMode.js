import { SET_THEME_MODE } from "actions/registry";
export function themeMode(state, action) {
    if (action.type === SET_THEME_MODE) {
        return action.payload || "light";
    }
    return state;
}

//# sourceMappingURL=themeMode.js.map