import React from "react";
import { IPortDefine } from "@rxdrag/minions-schema";
export declare const PortsInput: React.MemoExoticComponent<(props: {
    title: string;
    popoverTitle: string;
    value?: IPortDefine[] | undefined;
    onChange?: ((value?: IPortDefine[]) => void) | undefined;
    type: "input" | "output";
}) => JSX.Element>;
