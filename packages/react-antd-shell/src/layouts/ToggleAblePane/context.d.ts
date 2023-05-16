/// <reference types="react" />
export interface ToggleAblePaneParams {
    toggled: boolean;
    setToggled: (toggled: boolean | ((oldToggled: boolean) => boolean)) => void;
}
export declare const initialParams: ToggleAblePaneParams;
export declare const ToggleAblePaneContext: import("react").Context<ToggleAblePaneParams>;
