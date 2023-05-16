/// <reference types="react" />
export type ButtonItem = {
    key: string;
    title?: string;
    icon: React.ReactNode;
};
export type NavButtonProps = {
    showTitle?: boolean;
    actived?: boolean;
    item: ButtonItem;
    onSelect?: (key: string) => void;
};
export declare const NavButton: import("react").MemoExoticComponent<(props: NavButtonProps) => JSX.Element>;
