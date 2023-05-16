/// <reference types="react" />
import { ButtonItem } from "./NavButton";
export type LeftNavProps = {
    showTitle?: boolean;
    activedKey?: string;
    defaultActivedKey?: string;
    items?: ButtonItem[];
    onActive?: (activedKey: string) => void;
};
export declare const LeftNavWidget: import("react").MemoExoticComponent<(props: LeftNavProps) => JSX.Element>;
