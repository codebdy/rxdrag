import { useContext } from "react";
import { ToggleAblePaneContext } from "../context";
export function useToggleState() {
    const params = useContext(ToggleAblePaneContext);
    return params;
}
