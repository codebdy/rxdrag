import React, { CSSProperties } from "react";
export type PaneContainerProps = {
    style?: CSSProperties;
    className?: string;
    children?: React.ReactNode;
};
export declare const PaneContainer: React.MemoExoticComponent<(props: PaneContainerProps) => JSX.Element>;
