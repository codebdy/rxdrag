import { createContext } from "react";
export const initialParams = {
    toggled: false,
    setToggled: () => {
        throw new Error("Function not implemented.");
    }
};
export const ToggleAblePaneContext = createContext(initialParams);
