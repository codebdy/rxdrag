import React from "react";
import { IVariableDefineMeta } from "@rxdrag/schema";
export declare const VariableDialog: React.MemoExoticComponent<(props: {
    title: string;
    open?: boolean | undefined;
    onOk?: ((value?: any) => void) | undefined;
    onCancel?: (() => void) | undefined;
    value?: any;
}) => JSX.Element>;
