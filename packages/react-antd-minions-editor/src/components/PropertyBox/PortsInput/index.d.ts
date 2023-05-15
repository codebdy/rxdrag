import { IPortMeta } from "@rxdrag/schema";
import React from "react";
export declare const PortsInput: React.MemoExoticComponent<(props: {
    title: string;
    popoverTitle: string;
    value?: IPortMeta[] | undefined;
    onChange?: ((value?: IPortMeta[]) => void) | undefined;
    type: "input" | "output";
}) => JSX.Element>;
