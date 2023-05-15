import React from "react";
export declare const NameDialog: React.MemoExoticComponent<(props: {
    title: string;
    open?: boolean | undefined;
    onOk?: ((value?: string) => void) | undefined;
    onCancel?: (() => void) | undefined;
    value?: string | undefined;
}) => JSX.Element>;
