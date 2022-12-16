import { createContext } from "react";

export interface ToggleAblePaneParams {
  toggled: boolean,
  setToggled: (toggled: boolean | ((oldToggled: boolean) => boolean)) => void
}

export const initialParams: ToggleAblePaneParams = {
  toggled: false,
  setToggled: () => {
    throw new Error("Function not implemented.");
  }
}

export const ToggleAblePaneContext = createContext<ToggleAblePaneParams>(initialParams)