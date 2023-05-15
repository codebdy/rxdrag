import { IPortDefine } from "@rxdrag/schema";
import React from "react";
export declare const PortsInput: React.MemoExoticComponent<(props: {
    title: string;
    popoverTitle: string;
    value?: IPortDefine[] | undefined;
    onChange?: ((value?: IPortDefine[]) => void) | undefined;
    type: "input" | "output";
}) => JSX.Element>;
