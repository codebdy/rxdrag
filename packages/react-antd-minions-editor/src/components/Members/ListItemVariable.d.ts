import React from "react";
import { IVariableDefineMeta } from "@rxdrag/schema";
export declare const ListItemVariable: React.MemoExoticComponent<(props: {
    value: IVariableDefineMeta;
    children?: React.ReactNode;
    editTitle: string;
    onChange: (value: IVariableDefineMeta) => void;
    onRemove: (id: string) => void;
}) => JSX.Element>;
